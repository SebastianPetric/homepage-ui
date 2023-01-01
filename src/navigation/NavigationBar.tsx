import { Link } from "react-scroll";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setCookie } from "react-use-cookie";

export default function NavigationBar() {
  const { isAuthenticated, getAccessTokenSilently, logout, loginWithPopup } =
    useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const setToken = async () => {
        const token = await getAccessTokenSilently();
        setCookie("token", token, {
          SameSite: "Strict",
          Secure: true,
          /*HttpOnly: true*/
        });
      };
      setToken();
    } else setCookie("token", "0");
  }, [isAuthenticated]);

  const onLogin = () => {
    loginWithPopup();
  };

  const onLogout = () => {
    logout();
  };

  return (
    <div className="w-screen min-w-1200 h-20 fixed top-7 flex justify-center z-10">
      <div className="w-5/6 h-full bg-white rounded-3xl items-center flex flex-wrap place-content-between">
        <div className={"flex justify-start items-center h-full"}>
          <p className={"w-32 ml-5 font-bold text-xl"}>Sebastian Petöcz</p>
        </div>
        <div>
          <ul className={"flex flex-row justify-end font-bold mr-5"}>
            <Link to={"greeting-scroll"} className={"linkButton"}>
              hello
            </Link>
            <Link to={"aboutme-scroll"} className={"linkButton"}>
              about me
            </Link>
            <Link to={"career-scroll"} className={"linkButton"}>
              career
            </Link>
            <Link to={"academic-scroll"} className={"linkButton"}>
              academic
            </Link>
            <Link to={"info-scroll"} className={"linkButton"}>
              contact
            </Link>
            <Link to={"info-scroll"} className={"linkButton"}>
              download cve
            </Link>
            {isAuthenticated ? (
              <li className={"linkButton"} onClick={onLogout}>
                logout
              </li>
            ) : (
              <li className={"linkButton"} onClick={onLogin}>
                login
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
