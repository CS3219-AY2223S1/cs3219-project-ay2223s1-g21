import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarLink,
  SidebarMenu,
  SidebarProfile,
  SidebarLogout,
} from "./SidebarElements";
import { setIsLoading, setLogout } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

const Sidebar = ({ isOpen, toggle, isProfilePage }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLoading(true));
    dispatch(setIsLoading(false));
    dispatch(setLogout());
  };

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {isProfilePage && (
            <SidebarProfile onClick={toggle} to="/home">
              Home
            </SidebarProfile>
          )}
          {!isProfilePage && (
            <SidebarProfile onClick={toggle} to="/profile">
              Profile
            </SidebarProfile>
          )}
          {!isProfilePage && (
            <SidebarLink onClick={toggle} to="about">
              About
            </SidebarLink>
          )}
          {!isProfilePage && (
            <SidebarLink onClick={toggle} to="faq">
              FAQs
            </SidebarLink>
          )}
          <SidebarLogout onClick={handleLogout}>Logout</SidebarLogout>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
