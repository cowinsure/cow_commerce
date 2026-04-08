/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedPriceProps {
  value: number | any;
  className?: string;
  duration?: number; // in seconds, default 2 seconds
}

// Smooth ease-out counter animation - starts fast, slows down at end
export function AnimatedPrice({
  value,
  className,
  duration = 2,
}: AnimatedPriceProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const durationMs = duration * 1000;
    let startTime: number | null = null;
    let animationFrameId: number;

    // Easing function - ease-out-quart for fast start, slow end
    // This makes large numbers feel quicker
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Apply easing for smoother, faster feel
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(easedProgress * value);
      setCount(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
    </span>
  );
}

// Alternative spring-based version (commented out - can be used if needed)
// export function AnimatedPriceSpring({
//   value,
//   className,
//   duration = 2,
// }: AnimatedPriceProps) {
//   const ref = useRef<HTMLSpanElement>(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
//   const spring = useSpring(0, {
//     stiffness: 100,
//     damping: 20, // Higher damping for smoother, less bouncy animation
//   });
//   const display = useTransform(spring, (current) =>
//     Math.floor(current).toLocaleString(),
//   );
//   useEffect(() => {
//     if (isInView) {
//       spring.set(value);
//     }
//   }, [isInView, spring, value]);
//   return (
//     <motion.span ref={ref} className={className}>
//       {display}
//     </motion.span>
//   );
// }
