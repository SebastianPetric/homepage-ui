import {useEffect, useState} from "react";
import AcademicTab, {TAcademic} from "./AcademicTab";

export default function Academic() {

    const [academic, setAcademic] = useState<TAcademic[]>([]);

    useEffect(() => {
        const callApi = async () => {
            let response: TAcademic[] = await (await fetch(`${import.meta.env.VITE_REQUEST_URL}/academic`)).json();
            setAcademic(response);
        }
        callApi();
    }, [])

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Akademischer Werdegang.</p>
            <span className={"w-96 h-auto mt-8"}>
                <b>"Furtwangen ist das, was du drauß machst."</b> Wie wahr dieser Satz doch ist. Hier wurden sowohl Freunde fürs Leben gefunden, als auch die Basis für meine berufliche Laufbahn gelegt.
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>{academic.map(exp => <AcademicTab {...exp}/>)}</div>
        </div>
    );
}