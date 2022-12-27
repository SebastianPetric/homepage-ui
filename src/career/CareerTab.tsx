export type TCareer = {
    id: string,
    title: string,

    company: string,

    from_date: string,

    to_date: string | undefined,

    toDos: string[]
}


export default function CareerTab(career: TCareer) {
    const formattedFromDate = new Date(career.from_date)
    return (
        <div className={"flex flex-col careerTileWidth mt-5 mr-5"}>
            <p className={"text-xl font-bold mb-2 text-green-600"}>{career.title}</p>
            <p className={"text-sm font-bold"}>{career.company} von {formattedFromDate.getMonth()}/{formattedFromDate.getFullYear()} bis {career.to_date ? `${new Date(career.to_date).getMonth()}/${new Date(career.to_date).getFullYear()}` : "Heute"}</p>
            <ul className={"flex flex-col items-start text-sm"}>{career.toDos.map((toDo, index) => <li
                key={`${toDo}-${index}`}>{toDo}</li>)}</ul>
        </div>
    );
}