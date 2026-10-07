# Order Notification Bell — Implementation Plan

## Goal
Add a bell icon to the global navbar showing unpaid-order count. Clicking the bell reveals a dropdown with `order_no`, `payment_status`, and `total_amount` for each unpaid order. Clicking an order navigates to `/order-history?orderNo=<order_no>` and highlights that row.

## Approach
Introduce an `OrderContext` so the navbar and order-history page share order state without duplicate API calls. Refactor order-history to consume the context instead of maintaining its own local `apiOrders` state.

## Files to Create
- `context/OrderContext.tsx`
- `components/order/BellNotification.tsx`

## Files to Modify
- `app/(main)/layout.tsx` — wrap tree in `OrderProvider`
- `app/(main)/order-history/page.tsx` — consume context, add search-param highlighting
- `components/home/Navbar.tsx` — insert `BellNotification`

## Implementation Steps

### 1. `context/OrderContext.tsx`
- Create `OrderContext` + `OrderProvider` using `useOrder` hook.
- Expose:
  - `orders: Order[]`
  - `unpaidOrders: Order[]` — derived by filtering `payment_status === "UNPAID"`
  - `unpaidOrdersCount: number`
  - `fetchOrders`, `fetchOrderById`, `submitPayment`, `loading`, `error`
  - `refreshOrders()` — re-fetches page 1 with large pageSize (matches current `fetchOrders(1, 99, 1)` pattern)
- Call `refreshOrders()` once on mount inside the provider.

### 2. `components/order/BellNotification.tsx`
- Consume `useOrderContext`.
- Render `Bell` icon from `lucide-react`.
- Badge: show `unpaidOrdersCount` when > 0, styled with the existing `bg-emerald-500` + absolute positioning pattern used elsewhere in the codebase.
- Dropdown: `AnimatePresence` + `motion.div` with the same blur/scale/opacity transition used in `Navbar.tsx` user dropdown.
- Dropdown max-height with internal scroll if list is long.
- Each row: `order_no`, `payment_status` badge (reuse `getStatusBadge`), and `total_amount` formatted as `৳ <amount>`.
- Click row → `router.push("/order-history?orderNo=" + order.order_no)`, close dropdown.
- Hide entire bell when `unpaidOrdersCount === 0` (no empty state, no bell click area).

### 3. Navbar integration
- In `components/home/Navbar.tsx`, import `BellNotification`.
- Place it in the desktop right-side actions, between the existing `w-px h-6 bg-emerald-800/30 mx-1` divider and the user avatar dropdown.
- Use the same hover/scale patterns as the surrounding buttons (`whileHover={{ scale: 1.05 }}`).
- Mobile menu: bell can remain desktop-only for v1 since the dropdown requires hover. If mobile support is desired later, add a click-triggered variant.

### 4. Order-history page refactor
- Remove local `apiOrders` state and its `useEffect`.
- Import `useOrderContext` and read `orders` directly.
- For filtering/search, derive `filteredOrders` from context `orders`.
- `handlePaymentSuccess` → call `refreshOrders()` from context instead of `fetchOrders` directly.
- After payment modal success, context state updates, bell count updates automatically.

### 5. Order highlighting via search params
- In `app/(main)/order-history/page.tsx`:
  - Read `orderNo` from `useSearchParams()`.
  - After orders load, if `orderNo` exists:
    - Find the DOM node by `data-order-no="<orderNo>"` attribute (add to each row).
    - Call `scrollIntoView({ behavior: "smooth", block: "center" })`.
    - Apply a temporary highlight class (e.g., `ring-2 ring-emerald-500 ring-offset-2`) for 3 seconds, then remove.
  - Do not clear the search param automatically so the user can refresh/share the link.

## Validation
- Bell count matches UNPAID orders from API.
- Dropdown opens on hover, closes on mouse leave.
- Clicking a dropdown item navigates to order-history with the correct `orderNo` search param.
- Order row scrolls into view and is briefly highlighted.
- After a successful payment in the payment modal, bell count decreases without a full page reload.
- No additional API calls are made from the navbar — all reads come from context state populated by the order-history page or provider mount.

## Risks / Notes
- `fetchOrders` in `useOrder` currently hardcodes `organization_id = 1`. The context inherits this. If multi-org support is needed later, this needs to become dynamic.
- If orders API response format changes, both the context and order-history depend on the same hook, so drift risk is low.
- `getStatusBadge` is exported from order-history. Either move it to a shared `lib/` location or import from order-history. Moving to `lib/theme/` or similar is cleaner long-term but out of scope for this change.
