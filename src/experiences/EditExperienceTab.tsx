import {ReactElement, useState} from "react";

export const inputExperience = () => {
    return <input>Neu</input>
}

export const handleFormChange = () => {

}


export default function EditExperienceTab() {
    const [inputs, setInputs] = useState<ReactElement[]>([]);

    const addFields = () => {
        let newField = <div><input className={"mt-3"} name='name'
                                   placeholder='Name'
        />
            <button>Remove</button>
        </div>

        setInputs([...inputs, newField])
    }

    const removeFields = (index: any) => {
        let data = [...inputs];
        data.splice(index, 0)
        setInputs(data)
    }


    return <div className={"bg-green-50 rounded-3xl w-72 h-auto pt-3 pb-3 mt-5 mr-2 ml-2"}>
        <input className={"text-2xl font-bold mb-2"} placeholder={"hallo"}></input>
        <input className={"text-2xl font-bold mb-2"} placeholder={"hallo2"}></input>
        {inputs.map((input, index) => {
            return (
                <div key={index}>
                    <input
                        name='name'
                        placeholder='Name'
                        value={input.props}
                    />
                    <input
                        name='salary'
                        placeholder='Salary'
                    />
                </div>
            )
        })}
        <button onClick={() => addFields()}>Add experience</button>
        <button>Save</button>
    </div>
}