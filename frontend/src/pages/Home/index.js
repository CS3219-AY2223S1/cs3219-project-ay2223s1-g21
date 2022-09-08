import { useState } from "react";
import Navbar from "../../components/Navbar";
import MainSection from "../../components/MainSection";
import AboutSection from "../../components/AboutSection";
import FAQ from "../../components/FAQ";
import Sidebar from "../../components/Sidebar";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <MainSection />
      <AboutSection />
      <FAQ />
    </>
  )
}