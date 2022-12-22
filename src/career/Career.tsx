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
                Ja, Du siehst richtig. Meinen Zivildienst habe ich im Krankenhaus absolviert. Das liegt an meinem ursprünglichen Wunsch Medizin zu studieren. Dieser ist jedoch nach dem Zivildienst dem Wunsch <b>Software Entwickler</b> zu werden, gewichen.
            </span>
            <div className={"flex flex-wrap justify-start mt-8"}>
                {career.map(exp => <CareerTab {...exp}/>)}
            </div>
        </div>
    );
}