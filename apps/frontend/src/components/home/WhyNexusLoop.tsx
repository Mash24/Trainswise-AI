"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, ShieldCheck, TrendingUp, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Accessible Work for All",
    description: "Anyone, anywhere can join, contribute, and earn—no advanced degree or experience required.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    stats: ["10K+ Global Workers", "190+ Countries", "24/7 Support"],
  },
  {
    icon: ShieldCheck,
    title: "Quality & Trust",
    description: "Multi-layered review, transparent rewards, and ethical standards ensure fairness and excellence.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    stats: ["99.9% Accuracy", "3-Step Review", "Ethical AI"],
  },
  {
    icon: TrendingUp,
    title: "Growth & Opportunity",
    description: "Level up, unlock new skills, and access higher-paying tasks as you grow with the platform.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
    stats: ["5 Skill Tiers", "20+ Domains", "Career Growth"],
  },
  {
    icon: HeartHandshake,
    title: "Community & Support",
    description: "Join a global network, get help, and celebrate your impact with others on the same journey.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop",
    stats: ["Active Forums", "Mentorship", "Team Projects"],
  },
];

export function WhyNexusLoop() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="why-nexusloop">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-5" />
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-primary-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
      <div className="absolute bottom-0 -right-32 w-64 h-64 bg-secondary-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />

      <div className="container px-4 mx-auto relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <span className="text-sm font-medium">Why Choose Us</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold tracking-tight sm:text-4xl mb-4"
          >
            Why Choose NexusLoop?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            We're not just a platform—we're a movement to make AI work accessible, ethical, and rewarding for everyone.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-card rounded-xl overflow-hidden h-full border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-xl">
                <div className="relative w-full aspect-video">
                  <Image
                    src={reason.image}
                    alt={reason.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                      <reason.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground text-base mb-4">{reason.description}</p>
                  <div className="space-y-2">
                    {reason.stats.map((stat) => (
                      <div key={stat} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{stat}</span>
                      </div>
                    ))}
                  </div>
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
            Ready to join our global community?
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