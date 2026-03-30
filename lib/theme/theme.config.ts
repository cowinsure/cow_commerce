/**
 * Theme Configuration
 * 
 * Central configuration file containing all design tokens for the theming system.
 * This includes colors, typography, spacing, border-radius, shadows, and more.
 * 
 * Design tokens are organized by category and support both light and dark modes.
 */

import { type ClassValue, clsx } from 'clsx';

/* =============================================================================
 * COLOR TOKENS
 * =============================================================================
 */

export const colors = {
  // Primary colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // Secondary colors
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
  
  // Success colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  
  // Warning colors
  warning: {
    50: '#fffbub',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  // Error colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  // Info colors
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // Surface colors (for backgrounds)
  surface: {
    light: {
      background: '#ffffff',
      foreground: '#18181b',
      card: '#ffffff',
      cardForeground: '#18181b',
      popover: '#ffffff',
      popoverForeground: '#18181b',
      muted: '#f4f4f5',
      mutedForeground: '#71717a',
      accent: '#f4f4f5',
      accentForeground: '#18181b',
      border: '#e4e4e7',
      input: '#e4e4e7',
      ring: '#0ea5e9',
    },
    dark: {
      background: '#09090b',
      foreground: '#fafafa',
      card: '#18181b',
      cardForeground: '#fafafa',
      popover: '#18181b',
      popoverForeground: '#fafafa',
      muted: '#27272a',
      mutedForeground: '#a1a1aa',
      accent: '#27272a',
      accentForeground: '#fafafa',
      border: '#27272a',
      input: '#27272a',
      ring: '#0ea5e9',
    },
  },
} as const;

/* =============================================================================
 * TYPOGRAPHY TOKENS
 * =============================================================================
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
    mono: ['var(--font-mono)', 'monospace', 'Consolas', 'monospace'],
    heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
    body: ['var(--font-body)', 'system-ui', 'sans-serif'],
  },
  
  // Font sizes
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

/* =============================================================================
 * SPACING TOKENS
 * =============================================================================
 */

export const spacing = {
  0: '0px',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',  // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  11: '2.75rem',  // 44px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  28: '7rem',     // 112px
  32: '8rem',     // 128px
} as const;

/* =============================================================================
 * BORDER RADIUS TOKENS
 * =============================================================================
 */

export const borderRadius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

/* =============================================================================
 * SHADOW TOKENS
 * =============================================================================
 */

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

/* =============================================================================
 * TRANSITION TOKENS
 * =============================================================================
 */

export const transitions = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  timing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  property: {
    none: 'none',
    all: 'all',
    colors: 'color, background-color, border-color, text-color, fill, stroke',
    'colors-fast': 'color, background-color, border-color, text-color, fill, stroke, opacity',
    transform: 'transform',
  },
} as const;

/* =============================================================================
 * Z-INDEX TOKENS
 * =============================================================================
 */

export const zIndex = {
  base: '0',
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  modalBackdrop: '1300',
  modal: '1400',
  popover: '1500',
  tooltip: '1600',
  toast: '1700',
} as const;

/* =============================================================================
 * BREAKPOINT TOKENS
 * =============================================================================
 */

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/* =============================================================================
 * COMPONENT STYLES
 * =============================================================================
 */

export const components = {
  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary[600],
      color: '#ffffff',
      hoverBackgroundColor: colors.primary[700],
      activeBackgroundColor: colors.primary[800],
    },
    secondary: {
      backgroundColor: colors.secondary[600],
      color: '#ffffff',
      hoverBackgroundColor: colors.secondary[700],
      activeBackgroundColor: colors.secondary[800],
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.surface.light.border,
      color: colors.surface.light.foreground,
      hoverBackgroundColor: colors.surface.light.muted,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.surface.light.foreground,
      hoverBackgroundColor: colors.surface.light.muted,
    },
    danger: {
      backgroundColor: colors.error[600],
      color: '#ffffff',
      hoverBackgroundColor: colors.error[700],
      activeBackgroundColor: colors.error[800],
    },
  },
  
  // Input styles
  input: {
    base: {
      backgroundColor: colors.surface.light.background,
      borderColor: colors.surface.light.border,
      color: colors.surface.light.foreground,
      placeholderColor: colors.surface.light.mutedForeground,
    },
    focus: {
      borderColor: colors.primary[500],
      ringColor: colors.primary[500],
    },
  },
  
  // Card styles
  card: {
    light: {
      backgroundColor: colors.surface.light.card,
      borderColor: colors.surface.light.border,
      color: colors.surface.light.cardForeground,
    },
    dark: {
      backgroundColor: colors.surface.dark.card,
      borderColor: colors.surface.dark.border,
      color: colors.surface.dark.cardForeground,
    },
  },
} as const;

/* =============================================================================
 * UTILITY FUNCTIONS
 * =============================================================================
 */

/**
 * Generate CSS variable name from token path
 */
export function toCssVariable(...keys: string[]): string {
  return `--${keys.join('-')}`;
}

/**
 * Get color value from color token
 */
export function getColor(
  colorName: keyof typeof colors,
  shade: keyof typeof colors.primary | number = 500
): string {
  const colorGroup = colors[colorName];
  if (!colorGroup) return '#000000';
  
  if (typeof shade === 'number') {
    return colorGroup[shade as keyof typeof colorGroup] || '#000000';
  }
  
  // Handle nested colors like surface.light.background
  if (colorName === 'surface') {
    const surfaceColor = colorGroup as typeof colors.surface;
    const mode = shade as 'light' | 'dark';
    return surfaceColor[mode][shade as keyof typeof surfaceColor.light] || '#000000';
  }
  
  const colorValue = colorGroup[shade as keyof typeof colorGroup];
  if (typeof colorValue === 'object') {
    return colorValue[500] || '#000000';
  }
  
  return colorValue || '#000000';
}

/**
 * Create className from ClassValue inputs (clsx compatible)
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/* =============================================================================
 * THEME OBJECT
 * =============================================================================
 */

/**
 * Complete theme object for reference
 */
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  components,
} as const;

export type Theme = typeof theme;

/* =============================================================================
 * CSS VARIABLE EXPORT
 * =============================================================================
 */

/**
 * Generate CSS custom properties as a string
 * This can be used in globals.css or injected dynamically
 */
export function generateCssVariables(mode: 'light' | 'dark' = 'light'): string {
  const surface = colors.surface[mode];
  
  const cssProperties = [
    // Colors
    `--color-primary-50: ${colors.primary[50]}`,
    `--color-primary-100: ${colors.primary[100]}`,
    `--color-primary-200: ${colors.primary[200]}`,
    `--color-primary-300: ${colors.primary[300]}`,
    `--color-primary-400: ${colors.primary[400]}`,
    `--color-primary-500: ${colors.primary[500]}`,
    `--color-primary-600: ${colors.primary[600]}`,
    `--color-primary-700: ${colors.primary[700]}`,
    `--color-primary-800: ${colors.primary[800]}`,
    `--color-primary-900: ${colors.primary[900]}`,
    `--color-primary-950: ${colors.primary[950]}`,
    
    `--color-secondary-50: ${colors.secondary[50]}`,
    `--color-secondary-100: ${colors.secondary[100]}`,
    `--color-secondary-200: ${colors.secondary[200]}`,
    `--color-secondary-300: ${colors.secondary[300]}`,
    `--color-secondary-400: ${colors.secondary[400]}`,
    `--color-secondary-500: ${colors.secondary[500]}`,
    `--color-secondary-600: ${colors.secondary[600]}`,
    `--color-secondary-700: ${colors.secondary[700]}`,
    `--color-secondary-800: ${colors.secondary[800]}`,
    `--color-secondary-900: ${colors.secondary[900]}`,
    `--color-secondary-950: ${colors.secondary[950]}`,
    
    `--color-neutral-50: ${colors.neutral[50]}`,
    `--color-neutral-100: ${colors.neutral[100]}`,
    `--color-neutral-200: ${colors.neutral[200]}`,
    `--color-neutral-300: ${colors.neutral[300]}`,
    `--color-neutral-400: ${colors.neutral[400]}`,
    `--color-neutral-500: ${colors.neutral[500]}`,
    `--color-neutral-600: ${colors.neutral[600]}`,
    `--color-neutral-700: ${colors.neutral[700]}`,
    `--color-neutral-800: ${colors.neutral[800]}`,
    `--color-neutral-900: ${colors.neutral[900]}`,
    `--color-neutral-950: ${colors.neutral[950]}`,
    
    `--color-success-500: ${colors.success[500]}`,
    `--color-warning-500: ${colors.warning[500]}`,
    `--color-error-500: ${colors.error[500]}`,
    `--color-info-500: ${colors.info[500]}`,
    
    // Surface colors
    `--color-background: ${surface.background}`,
    `--color-foreground: ${surface.foreground}`,
    `--color-card: ${surface.card}`,
    `--color-card-foreground: ${surface.cardForeground}`,
    `--color-popover: ${surface.popover}`,
    `--color-popover-foreground: ${surface.popoverForeground}`,
    `--color-muted: ${surface.muted}`,
    `--color-muted-foreground: ${surface.mutedForeground}`,
    `--color-accent: ${surface.accent}`,
    `--color-accent-foreground: ${surface.accentForeground}`,
    `--color-border: ${surface.border}`,
    `--color-input: ${surface.input}`,
    `--color-ring: ${surface.ring}`,
    
    // Border radius
    `--radius-none: ${borderRadius.none}`,
    `--radius-sm: ${borderRadius.sm}`,
    `--radius-default: ${borderRadius.default}`,
    `--radius-md: ${borderRadius.md}`,
    `--radius-lg: ${borderRadius.lg}`,
    `--radius-xl: ${borderRadius.xl}`,
    `--radius-2xl: ${borderRadius['2xl']}`,
    `--radius-3xl: ${borderRadius['3xl']}`,
    `--radius-full: ${borderRadius.full}`,
    
    // Shadows
    `--shadow-none: ${shadows.none}`,
    `--shadow-sm: ${shadows.sm}`,
    `--shadow-default: ${shadows.default}`,
    `--shadow-md: ${shadows.md}`,
    `--shadow-lg: ${shadows.lg}`,
    `--shadow-xl: ${shadows.xl}`,
    `--shadow-2xl: ${shadows['2xl']}`,
    `--shadow-inner: ${shadows.inner}`,
  ];
  
  return cssProperties.join(';\n  ');
}