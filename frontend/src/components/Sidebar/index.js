import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarLink,
  SidebarMenu,
  SidebarProfile,
  SidebarLogout
} from "./SidebarElements";
import { handleLogoutAccount } from "../../services/user_service";
import { setIsLoading, setLogout } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

const Sidebar = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLoading(true));
    handleLogoutAccount().then(res => {
      dispatch(setIsLoading(false));
      dispatch(setLogout());
    });
  };


  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarProfile to="/profile">Profile</SidebarProfile>
          <SidebarLink to="about">About</SidebarLink>
          <SidebarLink to="faq">FAQs</SidebarLink>
          <SidebarLogout onClick={handleLogout}>
            Logout
          </SidebarLogout>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
