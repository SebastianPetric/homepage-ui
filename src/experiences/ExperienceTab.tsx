export type TExperience = {
    id: string,
    title: string,
    experiencePoints: string[]
}

export default function ExperienceTab(experience: TExperience) {
    return <div key={experience.id} className={"w-72 h-auto mt-5"}>
        <p className={"text-xl font-bold mb-2 text-green-600"}>{experience.title}</p>
        <ul>
            {experience.experiencePoints.map(point => <li className={"text-sm font-bold"}>{point}</li>)}
        </ul>
    </div>
}