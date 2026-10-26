import IntroLeader from "./components/IntroLeader";
import FilmOverlay from "./components/FilmOverlay";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatIDo from "./components/WhatIDo";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <IntroLeader />
      <FilmOverlay />
      <Navbar />
      <main>
        <Hero />
        <WhatIDo />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
