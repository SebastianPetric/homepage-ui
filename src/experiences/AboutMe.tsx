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
                Aktuell arbeite ich als Software Engineer bei der <b>Inxmail GmbH</b>. Mein erster Arbeitgeber nach meinem Studium in der Hochschule Furtwangen, wo ich sowohl meinen <b>Bachelor of Science</b>, als auch meinen <b>Master of Science</b> in <b>Medieninformatik</b> erhalten habe.
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>{experiences.map(exp =>
                <ExperienceTab {...exp}/>)}</div>
        </div>
    );
}