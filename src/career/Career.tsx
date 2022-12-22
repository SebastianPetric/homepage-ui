import {useEffect, useState} from "react";
import CareerTab, {TCareer} from "./CareerTab";

export default function Career() {
    const [career, setCareer] = useState<TCareer[]>([]);

    useEffect(() => {
        const callApi = async () => {
            let response: TCareer[] = await (await fetch(`${import.meta.env.VITE_REQUEST_URL}/career`)).json();
            setCareer(response);
        }
        callApi();
    }, [])

    return (
        <div className={"flex flex-col"}>
            <p className={"text-5xl font-bold"}>Beruflicher Werdegang.</p>
            <span className={"w-96 h-auto mt-8"}>
                Hello! I am an Android and Data engineer based in Paris France. The guiding quasar of my journey is working on solutions that leverage best-practice technologies to deliver a top user experience. I love all things android.
            </span>
            <div className={"flex flex-wrap justify-start mt-16"}>{career.map(exp => <CareerTab {...exp}/>)}</div>
        </div>
    );
}