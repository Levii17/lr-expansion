import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import WhatWeDo from "@/components/WhatWeDo";
import Projects from "@/components/Projects";
import WhyLR from "@/components/WhyLR";
import Standards from "@/components/Standards";
import ClientQuote from "@/components/ClientQuote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="lr-page">
      <Header />
      <main id="top">
        <Hero />
        <Approach />
        <WhatWeDo />
        <Projects />
        <WhyLR />
        <Standards />
        <ClientQuote />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
