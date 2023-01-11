import { useEffect, useState } from "react";
import {
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import NavigationButton from "./NavigationButton";
import { useAuth0 } from "@auth0/auth0-react";
import { setCookie } from "react-use-cookie";

export default function NavigationBar({
  onClickHighlightCveInput,
}: {
  onClickHighlightCveInput: (shouldHighlight: boolean) => void;
}) {
  const { isAuthenticated, getAccessTokenSilently, logout, loginWithPopup } =
    useAuth0();
  const [openNav, setOpenNav] = useState<boolean>(false);

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

  const onLogin = () => {
    setOpenNav(false);
    loginWithPopup();
  };

  const onLogout = () => {
    setOpenNav(false);
    logout();
  };

  const highlightCVERequestInput = () => {
    setOpenNav(false);
    onClickHighlightCveInput(true);
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-textColor">
      <NavigationButton
        title={"Hey"}
        linkTo={"greeting-scroll"}
        onClick={() => setOpenNav(false)}
      />
      <NavigationButton
        title={"Über mich"}
        linkTo={"aboutme-scroll"}
        onClick={() => setOpenNav(false)}
      />
      <NavigationButton
        title={"Beruf"}
        linkTo={"career-scroll"}
        onClick={() => setOpenNav(false)}
      />
      <NavigationButton
        title={"Schule"}
        linkTo={"academic-scroll"}
        onClick={() => setOpenNav(false)}
      />
      <NavigationButton
        title={"Kontakt"}
        linkTo={"info-scroll"}
        onClick={() => setOpenNav(false)}
      />
      <NavigationButton
        title={"Lebenslauf anfragen"}
        linkTo={"info-scroll"}
        onClick={highlightCVERequestInput}
      />
      {isAuthenticated ? (
        <NavigationButton
          title={"Logout"}
          linkTo={"greeting-scroll"}
          onClick={onLogout}
        />
      ) : (
        <NavigationButton
          title={"Login"}
          linkTo={"greeting-scroll"}
          onClick={onLogin}
        />
      )}
    </ul>
  );

  return (
    <div>
      <div
        className={
          "flex justify-center items-center w-screen fixed top-7 z-10 px-10"
        }
      >
        <Navbar className="text-textColor bg-white bg-opacity-70 rounded-2xl shadow-none border-none">
          <div className="container flex items-center justify-between">
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-bold text-xl"
            >
              <span className={"font-pacifico text-3xl"}>Sebastian Petöcz</span>
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
      </div>
      {openNav && (
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-0 z-0"
          onClick={() => setOpenNav(false)}
        ></div>
      )}
    </div>
  );
}
