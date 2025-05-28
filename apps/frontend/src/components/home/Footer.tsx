'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

const navigation = {
  product: [
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Features', href: '/#features' },
    { name: 'FAQ', href: '/faq' },
    { name: 'API', href: '/api-docs' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/nexusloop',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/nexusloop',
      icon: Linkedin,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/nexusloop',
      icon: Twitter,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t pt-12" aria-label="Site footer">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-8">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              NexusLoop
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              NexusLoop AI empowers people everywhere to earn, learn, and shape the future of artificial intelligence—one microtask at a time.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={item.name}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={item.name}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={item.name}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-t border-border/50 pt-8 gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} NexusLoop. All rights reserved.
          </p>
          <ul className="flex space-x-4 justify-center md:justify-end">
            {navigation.social.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
} 