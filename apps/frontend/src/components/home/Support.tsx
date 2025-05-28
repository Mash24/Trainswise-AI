import { Mail, MessageCircle } from 'lucide-react';

export function Support() {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-primary/5 via-bg-light to-accent-cyan/10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="w-7 h-7 text-accent-cyan" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">Need Help? Contact Support</h2>
        </div>
        <form className="bg-white/80 shadow-glass rounded-2xl p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input type="text" placeholder="Your Name" className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" required />
            <input type="email" placeholder="Your Email" className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" required />
          </div>
          <textarea placeholder="How can we help you?" className="px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none min-h-[120px]" required />
          <button type="submit" className="w-full md:w-auto px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-card hover:bg-primary/90 transition">Send Message</button>
        </form>
        <div className="mt-8 flex flex-col md:flex-row items-center gap-4 text-base text-muted-foreground">
          <Mail className="w-5 h-5 text-primary" />
          <span>Or email us at <a href="mailto:support@nexusloop.ai" className="underline text-primary">support@nexusloop.ai</a></span>
          <span className="hidden md:inline">|</span>
          <span>Live chat coming soon!</span>
        </div>
      </div>
    </section>
  );
} 