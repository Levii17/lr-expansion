import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatementStrip from "@/components/StatementStrip";
import Approach from "@/components/Approach";
import WhatWeDo from "@/components/WhatWeDo";
import Projects from "@/components/Projects";
import WhyLR from "@/components/WhyLR";
import Standards from "@/components/Standards";
import ClientQuote from "@/components/ClientQuote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="lr-page">
      <Header />
      <main id="top">
        <Hero />
        <StatementStrip />
        <Approach />
        <WhatWeDo />
        <Projects />
        <WhyLR />
        <Standards />
        <ClientQuote />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}