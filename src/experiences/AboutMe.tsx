import ExperienceTab, {TExperience} from "./ExperienceTab";
import {useEffect, useState} from "react";

export default function AboutMe() {

    const [experiences, setExperiences] = useState<TExperience[]>([]);

    useEffect(() => {
        const callApi = async () => {
            let response: TExperience[] = await (await fetch(`${import.meta.env.VITE_REQUEST_URL}/experiences`)).json();
            setExperiences(response);
        }
        callApi();
    }, []);

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Über mich.</p>
            <span className={"w-96 h-auto mt-8"}>
                Hello! I am an Android and Data engineer based in Paris France. The guiding quasar of my journey is working on solutions that leverage best-practice technologies to deliver a top user experience. I love all things android.
            </span>
            <div className={"flex flex-wrap justify-start mt-16"}>{experiences.map(exp =>
                <ExperienceTab {...exp}/>)}</div>
        </div>
    );
}