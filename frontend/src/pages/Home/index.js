import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import MainSection from "../../components/MainSection";
import AboutSection from "../../components/AboutSection";
import FAQ from "../../components/FAQ";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

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