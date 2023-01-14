import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setCookie } from "react-use-cookie";

export default function Authentication() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

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

  return <></>;
}
