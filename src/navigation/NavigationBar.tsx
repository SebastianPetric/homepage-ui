import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import NavigationButton from "./NavigationButton";
import { useAuth0 } from "@auth0/auth0-react";
import { setCookie } from "react-use-cookie";

export default function NavigationBar() {
  const { isAuthenticated, getAccessTokenSilently, logout, loginWithPopup } =
    useAuth0();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const setToken = async () => {
        const token = await getAccessTokenSilently();
        setCookie("token", token, {
          SameSite: "Strict",
          Secure: true,
        });
      };
      setToken();
    } else setCookie("token", "0");
  }, [isAuthenticated]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-imageColor">
      <NavigationButton title={"hello"} linkTo={"greeting-scroll"} />
      <NavigationButton title={"about me"} linkTo={"aboutme-scroll"} />
      <NavigationButton title={"career"} linkTo={"career-scroll"} />
      <NavigationButton title={"academic"} linkTo={"academic-scroll"} />
      <NavigationButton title={"contact"} linkTo={"info-scroll"} />
      <NavigationButton title={"download cve"} linkTo={"info-scroll"} />
      {isAuthenticated ? (
        <NavigationButton title={"logout"} onClick={() => logout()} />
      ) : (
        <NavigationButton title={"login"} onClick={loginWithPopup} />
      )}
    </ul>
  );

  return (
    <Navbar className="text-imageColor bg-opacity-90 rounded-2xl ml-10 mr-6">
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-bold text-xl"
        >
          <span>Sebastian Petöcz</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
}
