import { useState } from "react";
import Navbar from "../../components/Navbar";
import MainSection from "../../components/MainSection";
import AboutSection from "../../components/AboutSection";
import FAQ from "../../components/FAQ";
import Sidebar from "../../components/Sidebar";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const { isLoggedIn } = useSelector(state => state.authReducer);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  if (!isLoggedIn) {
    return (<Navigate to="/login"/>)
  }

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