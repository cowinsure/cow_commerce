/**
 * Authentication API Layer
 * 
 * This module provides mock authentication functions.
 * Replace the mock implementations with actual API calls when backend is ready.
 */

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  ranchName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  token?: string;
}

// Simulated network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock login function
 * Replace this with actual API call to your authentication endpoint
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  try {
    // Simulate network delay
    await delay(1000);

    // Mock validation
    if (!data.email || !data.password) {
      return {
        success: false,
        message: 'Email and password are required',
      };
    }

    // Mock email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address',
      };
    }

    // Mock password validation (minimum 6 characters)
    if (data.password.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters',
      };
    }

    // Mock successful login
    // In production, this would be an actual API call
    return {
      success: true,
      message: 'Login successful',
      user: {
        id: 'user_123',
        email: data.email,
        name: data.email.split('@')[0],
      },
      token: 'mock_jwt_token_' + Math.random().toString(36).substring(2),
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

/**
 * Mock signup function
 * Replace this with actual API call to your registration endpoint
 */
export async function signup(data: SignupData): Promise<AuthResponse> {
  try {
    // Simulate network delay
    await delay(1500);

    // Mock validation
    if (!data.email || !data.password || !data.ranchName) {
      return {
        success: false,
        message: 'All fields are required',
      };
    }

    // Mock email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address',
      };
    }

    // Mock password validation (minimum 6 characters)
    if (data.password.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters',
      };
    }

    // Mock ranch name validation (minimum 2 characters)
    if (data.ranchName.length < 2) {
      return {
        success: false,
        message: 'Ranch name must be at least 2 characters',
      };
    }

    // Mock successful signup
    // In production, this would be an actual API call
    return {
      success: true,
      message: 'Account created successfully',
      user: {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email: data.email,
        name: data.ranchName,
      },
      token: 'mock_jwt_token_' + Math.random().toString(36).substring(2),
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}

/**
 * Mock logout function
 */
export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    await delay(500);
    // In production, clear auth tokens and redirect
    return {
      success: true,
      message: 'Logged out successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Logout failed',
    };
  }
}

/**
 * Mock forgot password function
 */
export async function forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
  try {
    await delay(1000);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address',
      };
    }

    return {
      success: true,
      message: 'Password reset instructions sent to your email',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}