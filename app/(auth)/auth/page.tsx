'use client';

import { useState } from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthToggle } from '@/components/auth/AuthToggle';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';

type AuthMode = 'login' | 'signup';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');

  const titles = {
    login: {
      title: 'Welcome back',
      subtitle: 'Access your digital livestock portfolio and marketplace listings.',
    },
    signup: {
      title: 'Create your account',
      subtitle: 'Join the elite network of digital livestock commerce.',
    },
  };

  return (
    <AuthLayout>
      <div className="w-full">
        {/* Header */}
        <AuthHeader 
          title={titles[mode].title} 
          subtitle={titles[mode].subtitle}
          showLogo={false}
        />

        {/* Mode toggle */}
        <div className="mb-8">
          <AuthToggle mode={mode} onToggle={setMode} />
        </div>

        {/* Forms with smooth transition */}
        <div className="min-h-[450px]">
          {mode === 'login' ? (
            <div key="login" className="animate-fade-in">
              <LoginForm />
            </div>
          ) : (
            <div key="signup" className="animate-fade-in">
              <SignupForm />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            By signing in, you agree to our{' '}
            <a className="text-on-surface font-semibold underline decoration-primary-fixed underline-offset-2" href="#">Terms of Service</a>
            {' '}and{' '}
            <a className="text-on-surface font-semibold underline decoration-primary-fixed underline-offset-2" href="#">Privacy Policy</a>.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <svg className="w-5 h-5 text-outline-variant" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg className="w-5 h-5 text-outline-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg className="w-5 h-5 text-outline-variant" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </footer>
      </div>
    </AuthLayout>
  );
}