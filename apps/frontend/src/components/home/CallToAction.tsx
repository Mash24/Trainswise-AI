'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, BadgeCheck, Globe, Zap } from 'lucide-react';
import { useState, useEffect } from "react";

const benefits = [
  { icon: <Zap className="w-5 h-5 text-primary" />, title: "Instant Payouts" },
  { icon: <BadgeCheck className="w-5 h-5 text-secondary" />, title: "Skill Badges" },
  { icon: <Globe className="w-5 h-5 text-accent" />, title: "Global Community" },
  { icon: <Users className="w-5 h-5 text-primary" />, title: "Early Access" },
];

const testimonials = [
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Priya Sharma",
    country: "India",
    quote: "NexusLoop helped me earn and learn new skills while working from home. The platform is intuitive and the community is amazing!",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Alex Kim",
    country: "South Korea",
    quote: "NexusLoop gave me the opportunity to grow my skills from anywhere. The community is inspiring and the platform is so easy to use!",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    name: "Carlos Rivera",
    country: "Mexico",
    quote: "I love the instant payouts and the variety of microtasks. NexusLoop is the best platform for flexible work!",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Fatima Al-Farsi",
    country: "UAE",
    quote: "The global community and support on NexusLoop are unmatched. I feel valued and empowered every day!",
  },
];

const companies = [
  { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "IBM", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "OpenAI", src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Nvidia", src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
];

export function CallToAction() {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5 w-full">
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-3xl opacity-40 animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </motion.div>

      <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6 xl:px-6 relative z-10 flex flex-col gap-24">
        {/* Glassmorphism CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-12 flex flex-col lg:flex-row gap-12 items-center border border-white/40 mx-auto"
        >
          {/* New Unsplash Image */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-xs lg:max-w-sm aspect-square relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
              alt="Teamwork and AI Collaboration"
              fill
              className="object-cover rounded-2xl shadow-lg"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
          </motion.div>

          {/* CTA Content */}
          <div className="flex-1 flex flex-col gap-6 items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-2"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Join the Revolution</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-2 text-center lg:text-left"
            >
              Unlock Your Potential with NexusLoop
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground mb-4 text-center lg:text-left"
            >
              Join a global movement of innovators, earn as you learn, and help shape the next generation of AI—together.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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
            {/* Animated Benefits */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
            >
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center bg-white/60 rounded-xl p-4 shadow border border-white/30"
                >
                  <div className="mb-2">{b.icon}</div>
                  <div className="text-sm font-semibold text-center">{b.title}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center border border-white/40"
        >
          <TestimonialCarousel testimonials={testimonials} />
        </motion.div>

        {/* Featured In / Media Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-center gap-4 py-6"
        >
          <div className="text-lg font-semibold text-muted-foreground mb-2">Trusted by leading companies</div>
          <div className="flex flex-wrap justify-center items-center gap-8 w-full">
            {companies.map((c) => (
              <img
                key={c.name}
                src={c.src}
                alt={c.name}
                className="h-10 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300 bg-white rounded-md p-2 shadow-sm"
                style={{ maxWidth: 120 }}
                loading="lazy"
              />
            ))}
          </div>
        </motion.div>

        {/* Extra Section: Our Impact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl shadow-xl p-12 flex flex-col md:flex-row gap-8 items-center border border-white/30"
        >
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Our Impact</h3>
            <p className="text-lg text-muted-foreground mb-4">
              NexusLoop empowers thousands of people worldwide to contribute to the future of AI, earn meaningful rewards, and join a vibrant, supportive community.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">190+</div>
                <div className="text-xs text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-secondary">1.2M</div>
                <div className="text-xs text-muted-foreground">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-accent">$2.5M</div>
                <div className="text-xs text-muted-foreground">Paid Out</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-primary">4.8★</div>
                <div className="text-xs text-muted-foreground">Avg. Rating</div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-xs aspect-square relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
              alt="Global Impact"
              fill
              className="object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);
  const cardsToShow = 3;
  const interval = 4000; // 4 seconds

  // Responsive: 1 on mobile, 2 on tablet, 3 on desktop
  const getCardsToShow = () => {
    if (typeof window === 'undefined') return cardsToShow;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(getCardsToShow());

  // Update visibleCards on resize
  useEffect(() => {
    const handleResize = () => setVisibleCards(getCardsToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Calculate which testimonials to show
  const getVisibleTestimonials = () => {
    const arr = [];
    for (let i = 0; i < visibleCards; i++) {
      arr.push(testimonials[(index + i) % testimonials.length]);
    }
    return arr;
  };

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex w-full justify-center gap-6">
        {getVisibleTestimonials().map((t, i) => (
          <motion.div
            key={t.name + t.country}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex-1 min-w-0 max-w-xs bg-white/90 backdrop-blur rounded-xl shadow p-6 flex flex-col items-center border border-white/30"
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={64}
              height={64}
              className="rounded-full border-4 border-primary shadow mb-3"
            />
            <p className="text-base italic text-muted-foreground mb-2 text-center">“{t.quote}”</p>
            <div className="font-semibold text-primary">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.country}</div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-primary' : 'bg-muted-foreground/30'} transition-colors`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <button onClick={prev} aria-label="Previous testimonial" className="p-2 rounded-full bg-white/70 hover:bg-primary/20 transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <button onClick={next} aria-label="Next testimonial" className="p-2 rounded-full bg-white/70 hover:bg-primary/20 transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
} 