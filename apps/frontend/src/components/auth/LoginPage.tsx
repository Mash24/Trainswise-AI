'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const slogans = [
  'Join thousands of humans helping AI think smarter — and get paid for it.',
];
const benefits = [
  'Real Earnings',
  'Skill Growth',
  'Global Access',
  'Instant Payouts',
  'Premium Community',
];

export default function LoginPage() {
  const [benefitIndex, setBenefitIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBenefitIndex((i) => (i + 1) % benefits.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      {/* Left Panel */}
      <div className="relative hidden md:flex flex-col justify-center items-center p-8 md:p-12 bg-gradient-to-bl from-primary/80 via-accent/60 to-secondary/80 animate-gradient-move overflow-hidden">
        {/* Animated Gradient Circles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/30 rounded-full blur-3xl opacity-40 animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </motion.div>
        {/* Branding & Illustration */}
        <div className="relative z-10 flex flex-col items-center gap-6 w-full">
          <Link href="/" className="flex items-center gap-3 mb-4 group">
            <motion.span
              whileHover={{ scale: 1.08 }}
              className="font-heading font-extrabold text-3xl text-white drop-shadow-lg tracking-tight transition-all"
            >
              NexusLoop
            </motion.span>
          </Link>
          {/* Illustration */}
          <motion.img
            src="/images/ai-training.svg"
            alt="AI Training Illustration"
            className="w-64 h-64 mb-4 drop-shadow-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          {/* Animated Tagline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slogans[0]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-heading font-bold text-white text-center drop-shadow-lg min-h-[2.5rem]"
            >
              {slogans[0]}
            </motion.div>
          </AnimatePresence>
          {/* Rotating Benefits */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={benefitIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="inline-block px-4 py-2 rounded-full bg-white/20 text-white font-semibold text-lg shadow backdrop-blur-md border border-white/30"
              >
                {benefits[benefitIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex flex-col min-h-screen justify-center items-center p-4 md:p-12 bg-background/80 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col gap-6"
        >
          <div className="mb-2">
            <h2 className="font-heading text-2xl font-bold text-primary mb-1">Log in to NexusLoop</h2>
            <p className="text-muted-foreground text-sm">Welcome back! Please sign in to your account.</p>
          </div>
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-border px-4 py-2 font-sans text-base focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition shadow-sm bg-background/60"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-border px-4 py-2 font-sans text-base focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition shadow-sm bg-background/60"
                placeholder="Password"
              />
              <div className="text-xs text-muted-foreground mt-1">Use your NexusLoop credentials. At least 8 characters.</div>
            </div>
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">Forgot password?</Link>
            </div>
            <Button type="submit" size="lg" className="w-full mt-2 shadow-lg shadow-primary/10 bg-gradient-to-r from-primary to-accent text-white font-bold hover:brightness-110 hover:scale-[1.01] transition-all duration-200 backdrop-blur-md">
              Log in
            </Button>
          </form>
          {/* Divider */}
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-medium">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          {/* OAuth Buttons */}
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full flex items-center gap-3 justify-center group hover:bg-primary/10 transition-all">
              {/* Google SVG icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24"><g><path fill="#4285F4" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.469 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.57-3.906-2.539-6.656-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.781 0 9.594-4.055 9.594-9.773 0-.656-.07-1.156-.164-1.602z"/><path fill="#34A853" d="M3.17 7.548l3.281 2.406c.891-1.68 2.531-2.93 4.549-2.93 1.109 0 2.125.383 2.922 1.016l2.703-2.633c-1.703-1.57-3.906-2.539-6.656-2.539-2.703 0-5.078 1.055-6.875 2.773z"/><path fill="#FBBC05" d="M12 22c2.672 0 4.922-.883 6.563-2.406l-3.047-2.492c-.844.57-1.922.914-3.516.914-2.844 0-5.25-1.922-6.109-4.523l-3.234 2.5c1.781 3.484 5.547 6.007 9.343 6.007z"/><path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.469 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.57-3.906-2.539-6.656-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.781 0 9.594-4.055 9.594-9.773 0-.656-.07-1.156-.164-1.602z" opacity=".1"/></g></svg>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-3 justify-center group hover:bg-primary/10 transition-all">
              {/* Facebook SVG icon */}
              <svg className="w-5 h-5 text-[#1877F3]" viewBox="0 0 24 24"><path fill="#1877F3" d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              Continue with Facebook
            </Button>
          </div>
          {/* Bottom Section */}
          <div className="text-center text-sm mt-2">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary font-semibold hover:underline">Sign up</Link>
          </div>
        </motion.div>
        {/* Footer */}
        <footer className="w-full max-w-md mx-auto mt-8 text-xs text-muted-foreground flex justify-center gap-4 opacity-80">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <span>&middot;</span>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <span>&middot;</span>
          <Link href="/help" className="hover:underline">Help</Link>
        </footer>
      </div>
    </div>
  );
}

// Add this to your CSS for the animated gradient and blob:
// .animate-gradient-move { background-size: 200% 200%; animation: gradientMove 8s ease-in-out infinite; }
// @keyframes gradientMove { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
// .animate-blob { animation: blob 8s infinite alternate; }
// @keyframes blob { 0% { transform: scale(1) translate(0, 0); } 100% { transform: scale(1.1) translate(20px, 20px); } } 