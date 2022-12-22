import '../App.css'
import {LogoutOptions, RedirectLoginOptions, useAuth0} from "@auth0/auth0-react";
import {useState} from "react";
import useCookie from "react-use-cookie";
import {Element} from "react-scroll";
import {ProfileImage} from "../profile/ProfileImage";

export default function Test() {
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
        getAccessTokenSilently,
        loginWithPopup
    } = useAuth0();

    const [User, setUser] = useState<ProfileInfo[]>([]);
    const [userToken, setUserToken] = useCookie('token', '0');


    const callApi = async () => {
        let response: ProfileInfo[] = await (await fetch(`${import.meta.env.VITE_REQUEST_URL}/users`)).json();

        setUser(response);
        console.log(User);
    }

    const callProtectedApi = async () => {

        try {
            setUserToken(await getAccessTokenSilently(), {
                SameSite: 'Strict',
                Secure: true,
            });

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${userToken}`
                }
            };
            const response = (await fetch(`${import.meta.env.VITE_REQUEST_URL}/users/6397a32934f2c743372a0fb4`, requestOptions));
            console.log(response.status);
            console.log(await response.json());

        } catch (err) {
            console.log(err);
        }
    }


    if (isLoading)
        return <div>Loading....</div>
    if (error)
        return <div>Oops.... {error.message}</div>


    return <>
        <Element name={"home-anchor"} className={"element"}></Element>
        <ProfileImage/>
        <ul>
            <li>
                <button onClick={loginWithPopup}>Login with popup</button>
            </li>
            <li>
                <button onClick={loginWithRedirect}>Login with redirect</button>
            </li>
            <li>
                <button onClick={() => logout({returnTo: window.location.origin})}>logout</button>
            </li>
            <h3>
                User is {isAuthenticated ? "Logged in" : "Logged out"}
            </h3>


            <ul>
                <li>
                    <button onClick={callApi}>Call Api route</button>
                </li>
                <li>
                    <button onClick={callProtectedApi}>Call protected API route</button>
                </li>
            </ul>
            <span>
            {JSON.stringify(user, null, 2)}
        </span>
        </ul>
    </>
}
export type ProfileInfo = {
    birthday: string | undefined
    familyState: string | undefined
    first_name: string | undefined
    github_link: string | undefined
    id: string | undefined
    last_name: string | undefined
    linkedin_link: string | undefined
    nationality: string | undefined
    phone: string | undefined
    xing_link: string | undefined
}

export type Profile = {
    name: string | undefined;
    image_url: string | undefined;

    isAuthenticated: boolean;

    loginWithRedirect: (options?: (RedirectLoginOptions | undefined)) => Promise<void>;

    logout: (options?: (LogoutOptions | undefined)) => void;
}