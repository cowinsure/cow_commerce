# The Digital Agrarian - Project Documentation

## Project Overview

**The Digital Agrarian** is a Next.js 14 (App Router) e-commerce platform for buying and selling cattle. The project follows a production-grade, feature-based API architecture with strict separation of concerns.

---

## 🏗️ Architecture Overview

### Data Flow

```
Component → Hook → API → Axios Client → Backend
```

### Key Principles

1. **NEVER** call axios directly in components
2. **NEVER** call API functions directly in components
3. **ALWAYS** go through hooks for business logic
4. **NEVER** use localStorage directly - use tokenService
5. Keep API layer **pure** (no UI logic, no localStorage)
6. Keep hooks **clean** and **reusable**

---

## 📁 Folder Structure

```
cow_commerce/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes group
│   │   └── auth/page.tsx         # Login/Signup page
│   ├── (main)/                   # Main app routes
│   │   ├── page.tsx              # Home page
│   │   ├── marketplace/           # Marketplace listing
│   │   ├── cows/[id]/            # Cow details page
│   │   ├── checkout/             # Checkout page
│   │   ├── order-history/        # Order history page
│   │   └── profile/              # User profile page
│   ├── api/                      # API routes
│   │   └── auth/                 # Server-side cookie handling
│   │       ├── clear-cookies/    # Clear auth cookies
│   │       └── set-cookies/      # Set auth cookies
│   ├── not-found.tsx             # Custom 404 page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── auth/                    # Auth-related components
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── AuthLayout.tsx
│   │   └── AuthToggle.tsx
│   ├── cart/                    # Cart components
│   ├── cow/                     # Cow detail components
│   ├── home/                    # Home page components
│   │   ├── Navbar.tsx           # Main navigation
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   └── ui/                      # Reusable UI components
│       ├── InputField.tsx
│       ├── Toast.tsx
│       └── ...
│
├── hooks/                       # React hooks (Business Logic)
│   ├── auth/
│   │   └── useAuth.ts           # Authentication hook
│   ├── order/
│   │   └── useOrder.ts          # Order management hook
│   ├── product/
│   │   └── useProduct.ts        # Product management hook
│   └── useApi.ts                # Generic API hook (legacy)
│
├── lib/                         # Core libraries
│   ├── api/                     # API Layer
│   │   ├── apiClient.ts         # Central axios instance
│   │   ├── routes.ts            # API endpoint configuration
│   │   ├── auth/
│   │   │   ├── login.ts         # loginApi
│   │   │   ├── register.ts     # registerApi, verifyOtpApi, setPasswordApi
│   │   │   └── forgotPassword.ts # forgotPasswordApi
│   │   ├── order/
│   │   │   └── order.ts        # createOrderApi, getOrdersApi, getOrderByIdApi
│   │   └── product/
│   │       └── product.ts     # getProductsApi, getProductByIdApi, getCategoriesApi
│   │
│   ├── auth/
│   │   └── tokenService.ts     # Token management (localStorage wrapper)
│   │
│   ├── config/
│   │   ├── routes.ts           # App route configuration (public/protected)
│   │   └── protected-routes.ts # Route protection utilities
│   │
│   ├── models/                  # DTOs (Data Transfer Objects)
│   │   ├── authDTO.ts          # Auth request/response types
│   │   ├── orderDTO.ts         # Order request/response types
│   │   └── productDTO.ts       # Product request/response types
│   │
│   ├── data/
│   │   └── cows.ts             # Mock data for cows
│   │
│   └── theme/
│       └── theme.config.ts     # Theme configuration (colors, typography, etc.)
│
├── public/                      # Static assets
│   ├── cowImg/                 # Cow images
│   └── ...
│
├── middleware.ts               # Next.js middleware for route protection
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── package.json                # Dependencies
```

---

## 🔄 How API Calls Work

### Example: Login Flow

1. **Component** (LoginForm.tsx)
   ```tsx
   const { login } = useAuth();
   await login({ mobile_number, password });
   ```

2. **Hook** (hooks/auth/useAuth.ts)
   ```tsx
   const login = async (credentials) => {
     const response = await loginApi(credentials);
     setToken(response.access_token, response.refresh_token);
     setUserData(user);
   };
   ```

3. **API** (lib/api/auth/login.ts)
   ```tsx
   export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
     const response = await apiClient.post(AUTH_API.LOGIN, data);
     return response.data.data; // Extract from nested response
   }
   ```

4. **Axios Client** (lib/api/apiClient.ts)
   ```tsx
   // Adds Authorization header automatically
   apiClient.interceptors.request.use((config) => {
     const token = getToken();
     if (token) config.headers.Authorization = `Bearer ${token}`;
     return config;
   });
   ```

5. **Token Service** (lib/auth/tokenService.ts)
   ```tsx
   export function setToken(accessToken, refreshToken) {
     localStorage.setItem('access_token', accessToken);
     localStorage.setItem('refresh_token', refreshToken);
     // Also sets cookies for middleware
   }
   ```

---

## 📦 Available APIs

### ✅ Authentication API (Ready)

| Endpoint | Method | Hook Method | Description |
|----------|--------|-------------|-------------|
| `/v1/auth/public/login/` | POST | `login()` | User login |
| `/v1/auth/public/register/` | POST | `register()` | User registration |
| `/v1/auth/public/register/verify-otp/` | POST | `verifyOtp()` | OTP verification |
| `/v1/auth/public/register/set-password/` | POST | `setPassword()` | Set password after OTP |
| `/v1/auth/public/forgot-password/` | POST | `forgotPassword()` | Password reset |

### 🔧 Order API (Stub - Coming Soon)

| Endpoint | Method | Hook Method | Description |
|----------|--------|-------------|-------------|
| `/v1/orders/create/` | POST | `createOrder()` | Create new order |
| `/v1/orders/` | GET | `fetchOrders()` | Get user orders |
| `/v1/orders/{id}/` | GET | `fetchOrderById()` | Get order details |

### 🔧 Product API (Stub - Coming Soon)

| Endpoint | Method | Hook Method | Description |
|----------|--------|-------------|-------------|
| `/v1/products/` | GET | `fetchProducts()` | Get product list |
| `/v1/products/{id}/` | GET | `fetchProductById()` | Get product details |
| `/v1/products/categories/` | GET | `fetchCategories()` | Get categories |

---

## 🛒 Site Features

### Current Features (Implemented)

1. **Authentication**
   - Login with mobile number and password
   - Registration with OTP verification
   - Password reset flow
   - Session management with cookies for middleware
   - Protected routes (profile, order-history, checkout)

2. **Navigation**
   - Responsive navbar with auth state
   - Mobile menu support
   - Protected route filtering
   - User dropdown menu

3. **User Profile**
   - Profile page with user details
   - Account settings menu
   - Logout functionality

4. **Pages**
   - Home page with hero section
   - Marketplace listing
   - Cow detail pages
   - Checkout page (UI ready)
   - Order history page (UI ready)
   - Custom 404 error page

### Coming Soon Features

1. **Product Features**
   - Product listing with filters
   - Product search
   - Categories
   - Product details with gallery

2. **Order Features**
   - Create order
   - Order history
   - Order tracking

3. **Cart Features**
   - Add to cart
   - Cart management
   - Checkout flow

4. **User Features**
   - Edit profile
   - Address management
   - Payment methods

---

## 🔐 Authentication Flow

```
1. User enters credentials → LoginForm
2. login() called → useAuth hook
3. loginApi() called → API layer
4. apiClient.post() → Axios → Backend
5. Response received → tokenService.setToken()
6. Tokens stored in localStorage + cookies
7. Middleware reads cookies for protected routes
8. User redirected to home
```

### Token Storage
- **localStorage**: For client-side auth checks
- **Cookies (httpOnly)**: For middleware/server-side auth

---

## 🎨 UI/UX Features

- Emerald color theme
- Dark mode support
- Framer Motion animations
- Responsive design (mobile-first)
- Custom components (InputField, Toast)
- Consistent design tokens in theme.config.ts

---

## 🔧 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://your-api-base-url
```

---

## 📝 Important Notes

1. The API response format is:
   ```json
   {
     "statusCode": "200",
     "statusMessage": "Success",
     "data": { ... }
   }
   ```
   So API functions extract `response.data.data` to get the actual data.

2. The middleware protects routes based on cookies, not localStorage.

3. All components use the `useAuth` hook for authentication state.

4. The project uses TypeScript for type safety.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

*Documentation last updated: April 2026*