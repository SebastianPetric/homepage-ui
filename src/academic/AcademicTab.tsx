export type TAcademic = {
    id: string,
    title: string,

    school: string,

    from_date: string,

    to_date: string,

    focusList: string[]
}


export default function AcademicTab(career: TAcademic) {

    const formattedFromDate = new Date(career.from_date)
    const formattedToDate = new Date(career.to_date)


    return (<>
        <div className={"flex flex-col items-start careerTileWidth h-auto mt-5 mr-5"}>
            <p className={"text-xl font-bold mb-2 text-green-600"}>{career.title}</p>
            <p className={"text-sm font-bold"}>{career.school} von {formattedFromDate.getMonth()}/{formattedFromDate.getFullYear()} bis {formattedToDate.getMonth()}/{formattedToDate.getFullYear()}</p>
            <ul className={"flex flex-col items-start text-sm"}>{career.focusList.map(focus => <li>{focus}</li>)}</ul>
        </div>
    </>);
}