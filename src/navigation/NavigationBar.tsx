import {Link} from "react-scroll";

export default function NavigationBar() {
    return (
        <div className="w-screen min-w-1200 h-20 fixed top-7 flex justify-center z-10">
            <div className="w-5/6 h-full bg-white rounded-3xl items-center flex flex-wrap place-content-between">
                <div className={"flex justify-start items-center h-full"}>
                    <p className={"w-32 ml-5 font-bold text-xl"}>Sebastian Petöcz</p>
                </div>
                <div>
                    <ul className={"flex flex-row justify-end font-bold mr-5"}>
                        <Link to={"greeting-scroll"} className={"linkButton"}>hello</Link>
                        <Link to={"aboutme-scroll"} className={"linkButton"}>about me</Link>
                        <Link to={"career-scroll"} className={"linkButton"}>career</Link>
                        <Link to={"academic-scroll"} className={"linkButton"}>academic</Link>
                        <Link to={"info-scroll"} className={"linkButton"}>contact</Link>
                        <Link to={"info-scroll"} className={"linkButton"}>download cve</Link>
                        <li className={"linkButton"}>login</li>
                    </ul>
                </div>
            </div>
        </div>);
}