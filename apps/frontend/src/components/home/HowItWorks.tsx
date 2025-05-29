'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Upload, CheckCircle, Shield, Wallet } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Post AI Tasks',
    description: 'Clients submit training tasks (labeling, tagging, moderation, etc.) in minutes.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: CheckCircle,
    title: 'Complete Microtasks',
    description: 'Global workers pick up tasks, contribute their insights, and earn instantly.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Shield,
    title: 'Expert Review',
    description: 'Specialists validate results for accuracy, fairness, and quality.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Wallet,
    title: 'Get Paid & Grow',
    description: 'Earn, level up, and withdraw securely—track your impact and rewards.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-muted/50 relative overflow-hidden w-full" id="how-it-works">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-5" />
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-primary-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="absolute bottom-0 -right-32 w-64 h-64 bg-secondary-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />

      <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6 xl:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <span className="text-sm font-medium">Simple Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4"
          >
            How NexusLoop Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            A seamless, scalable workflow for clients, workers, and reviewers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-card rounded-xl p-6 h-full border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col">
                <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-base flex-grow">{step.description}</p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="text-sm font-medium text-primary">Step {index + 1}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to start your journey with NexusLoop?
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Get Started Now
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 