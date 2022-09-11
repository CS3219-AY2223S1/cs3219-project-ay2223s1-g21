import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProfileSection from "../../components/ProfileSection";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(() => false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [section, setSection] = useState(() => true);

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar />
      <ProfileSection section={section} />
    </>
  );
};

export default Profile;