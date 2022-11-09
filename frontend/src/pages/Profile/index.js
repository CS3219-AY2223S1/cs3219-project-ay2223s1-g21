import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProfileSection from "../../components/ProfileSection";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(() => false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} isProfilePage={true} />
      <Navbar toggle={toggle} curUrl={"/profile"} />
      <ProfileSection />
    </>
  );
};

export default Profile;
