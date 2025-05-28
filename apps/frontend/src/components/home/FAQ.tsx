'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is NexusLoop?',
    answer: 'NexusLoop is a global platform connecting people with AI training microtasks, enabling anyone to earn, learn, and contribute to the future of AI.'
  },
  {
    question: 'Who can join NexusLoop?',
    answer: 'Anyone! Whether you are a student, professional, or just curious, NexusLoop welcomes contributors from all backgrounds and countries.'
  },
  {
    question: 'How do I get paid?',
    answer: 'You can receive instant payouts via PayPal, bank transfer, or crypto, depending on your region.'
  },
  {
    question: 'What types of tasks are available?',
    answer: 'Tasks range from data labeling and content moderation to language annotation and AI model evaluation.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use industry-standard encryption and comply with global privacy regulations to keep your data safe.'
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach out via our support form below or email support@nexusloop.ai. We are here to help!'
  },
  {
    question: 'Can enterprises use NexusLoop?',
    answer: 'Absolutely! We offer scalable solutions for businesses to source high-quality AI training data.'
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="w-full py-20 bg-gradient-to-br from-bg-light via-white to-primary/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-7 h-7 text-primary" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl bg-white/80 shadow-glass p-6">
              <button
                className="flex w-full items-center justify-between text-lg font-semibold text-text-main focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span>{faq.question}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }}>
                  <ChevronDown className="w-6 h-6 text-primary" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 text-base text-muted-foreground"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 