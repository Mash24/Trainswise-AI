import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Features } from '@/components/home/Features';
import { WhyNexusLoop } from '@/components/home/WhyNexusLoop';
import { CallToAction } from '@/components/home/CallToAction';
import { FAQ } from '@/components/home/FAQ';
import { Support } from '@/components/home/Support';
import { Footer } from '@/components/home/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <WhyNexusLoop />
      <CallToAction />
      <Support />
      <FAQ />
      <Footer />
    </main>
  );
} 