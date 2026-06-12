import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import AIAssistant from "@/components/chat/AIAssistant";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}
