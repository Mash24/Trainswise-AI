'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 py-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-10" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-light/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-light/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-light/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="container relative px-4 mx-auto flex flex-col items-center">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">The Future of AI Training</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-balance text-4xl font-display font-extrabold tracking-tight sm:text-6xl md:text-7xl"
            >
              Empowering{' '}
              <span className="relative">
                <span className="relative z-10 text-primary">Global Intelligence</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full text-primary/20"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6C1 6 41.5 -4 99.5 6C157.5 16 199 6 199 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              <span className="block mt-2 text-3xl font-bold text-muted-foreground">
                Fueling the Future of AI, Together
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
            >
              NexusLoop AI connects people worldwide with meaningful microtasks that power the next generation of artificial intelligence. Earn, grow, and make an impact—no matter where you are.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/10 group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
              aria-label="Platform statistics"
            >
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-muted-foreground">Active Workers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-muted-foreground">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">1M+</div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">$2M+</div>
                <div className="text-sm text-muted-foreground">Paid to Workers</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
                alt="AI Training Platform"
                fill
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
            </div>
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-card p-4 rounded-xl shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">AI Training</div>
                  <div className="text-xs text-muted-foreground">Real-time Processing</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-lg text-center text-primary font-semibold max-w-2xl mx-auto"
        >
          Our mission: Make AI advancement accessible, ethical, and rewarding for everyone.
        </motion.p>
      </div>
    </section>
  );
} 