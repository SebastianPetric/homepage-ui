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
                Hello! I am an Android and Data engineer based in Paris France. The guiding quasar of my journey is working on solutions that leverage best-practice technologies to deliver a top user experience. I love all things android.
            </span>
            <div className={"flex flex-wrap justify-start mt-16"}>{academic.map(exp => <AcademicTab {...exp}/>)}</div>
        </div>
    );
}