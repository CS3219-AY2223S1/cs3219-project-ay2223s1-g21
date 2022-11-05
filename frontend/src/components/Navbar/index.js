import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavLinkR,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useDispatch } from "react-redux";
import { setLogout, setIsLoading } from "../../redux/actions/auth";

import { handleLogoutAccount } from "../../services/user_service";

const Navbar = (props) => {
  const { toggle } = props;
  const [scrollNav, setScrollNav] = useState(() => false);
  const dispatch = useDispatch();

  const curUrlIsProfileOrChangePassword =
    window.location.pathname === "/profile" ||
    window.location.pathname === "/change_password";

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => window.removeEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const handleLogout = () => {
    dispatch(setIsLoading(true));
    handleLogoutAccount().then(res => {
        dispatch(setIsLoading(false));
        dispatch(setLogout());
    });
  };

  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            PeerPrep
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <h3>
              <FaBars />
            </h3>
          </MobileIcon>
          <NavMenu>
            <NavLinkR to={!curUrlIsProfileOrChangePassword ? "/profile" : "/home"}>
              {!curUrlIsProfileOrChangePassword ? "Profile" : "Home"}
            </NavLinkR>
            {!curUrlIsProfileOrChangePassword && (
              <>
                <NavItem>
                  <NavLinks
                    to="about"
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-80}
                  >
                    About
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks
                    to="faq"
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={-80}
                  >
                    FAQs
                  </NavLinks>
                </NavItem>
              </>
            )}
            <NavItem>
              <NavLinkR to="/login" onClick={handleLogout}>
                Logout
              </NavLinkR>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
