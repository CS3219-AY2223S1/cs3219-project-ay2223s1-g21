import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProfileSection from "../../components/ProfileSection";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { animationThree, transition } from "../animation";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(() => false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={animationThree}
      transition={transition}
    >
      <Sidebar isOpen={isOpen} toggle={toggle} isProfilePage={true} />
      <Navbar toggle={toggle} />
      <ProfileSection />
    </motion.div>
  );
};

export default Profile;
