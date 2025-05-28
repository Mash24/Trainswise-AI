'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Briefcase,
  Settings,
  Shield,
  Bell,
  BarChart,
  Users,
  Zap,
  Award,
  Wallet,
  Globe,
  TrendingUp,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: Briefcase,
    title: 'Custom Task Types',
    description: 'Clients can create, manage, and automate specialized AI training tasks for any use case.',
    category: 'For Clients',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Settings,
    title: 'API Integrations',
    description: 'Seamlessly connect your data pipelines and workflows with our robust API.',
    category: 'For Clients',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Shield,
    title: 'Quality Control',
    description: 'Multi-layered review and validation ensures only the best data powers AI.',
    category: 'For All',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Award,
    title: 'Skill Tiers & Badges',
    description: 'Workers level up, unlock new opportunities, and earn recognition for expertise.',
    category: 'For Workers',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Users,
    title: 'Community & Referrals',
    description: 'Grow your network, invite friends, and earn together in a global community.',
    category: 'For All',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Wallet,
    title: 'Secure Wallet & Payouts',
    description: 'Instant, transparent payments with full earnings history and withdrawal options.',
    category: 'For Workers',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    description: 'Never miss a task or update with instant notifications and reminders.',
    category: 'For All',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: BarChart,
    title: 'Performance Dashboard',
    description: 'Track your progress, earnings, and impact with beautiful analytics.',
    category: 'For All',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Zap,
    title: 'Fast Task Matching',
    description: 'Smart algorithms match workers to tasks that fit their skills and interests.',
    category: 'For Workers',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Anyone, anywhere can join and contribute—no barriers, just opportunity.',
    category: 'For All',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Learning',
    description: 'Upskill with every task, access resources, and grow your AI expertise.',
    category: 'For Workers',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
  },
  {
    icon: Star,
    title: 'Trust & Transparency',
    description: 'Clear rules, fair rewards, and open communication at every step.',
    category: 'For All',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  },
];

const categories = ['All', 'For Clients', 'For Workers', 'For All'];

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-5" />
      <div className="absolute top-1/2 -right-32 w-64 h-64 bg-primary-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="absolute bottom-0 -left-32 w-64 h-64 bg-secondary-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />

      <div className="container px-4 mx-auto relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <span className="text-sm font-medium">Platform Features</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            Powerful tools and features to train AI models, earn, and grow—on your terms.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card rounded-xl overflow-hidden h-full border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl">
                <div className="relative w-full aspect-video">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary backdrop-blur-sm">
                      {feature.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-base">{feature.description}</p>
                </div>
              </div>
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
            Ready to explore all features?
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