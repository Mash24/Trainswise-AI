'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 py-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cta/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      {/* Full-width wrapper with tight padding */}
      <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6 xl:px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium font-sans">The Future of AI Training</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-balance text-4xl font-heading font-extrabold tracking-tight sm:text-6xl md:text-7xl"
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
              <span className="block mt-2 text-3xl font-bold text-muted-foreground font-sans">
                Fueling the Future of AI, Together
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 font-sans"
            >
              NexusLoop AI connects people worldwide with meaningful microtasks that power the next generation of artificial intelligence. Earn, grow, and make an impact—no matter where you are.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-primary/10 group rounded-2xl">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-2xl">
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
              {[
                ['10K+', 'Active Workers'],
                ['500+', 'Enterprise Clients'],
                ['1M+', 'Tasks Completed'],
                ['$2M+', 'Paid to Workers'],
              ].map(([value, label], index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-heading">
                    {value}
                  </div>
                  <div className="text-sm text-muted-foreground font-sans">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
                alt="AI Training Platform"
                fill
                className="object-cover rounded-2xl shadow-xl shadow-primary/10"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-card p-4 rounded-xl shadow-xl shadow-primary/10 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium font-heading">AI Training</div>
                  <div className="text-xs text-muted-foreground font-sans">Real-time Processing</div>
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
          className="mt-16 text-lg text-center text-primary font-semibold max-w-2xl mx-auto font-heading"
        >
          Our mission: Make AI advancement accessible, ethical, and rewarding for everyone.
        </motion.p>
      </div>
    </section>
  );
}
