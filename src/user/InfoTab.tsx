export type TUserInfo = {
    id: string,
    first_name: string,

    last_name: string,

    phone: string,

    email: string

}

export default function InfoTab(user: TUserInfo) {
    return <div className={"flex flex-col"}>
        <p className={"text-xl font-bold mb-2 text-green-600"}>{user ? user.first_name : ""} {user ? user.last_name : ""}</p>
        <p className={"text-sm font-bold"}>Mobil: {user ? user.phone : ""}</p>
        <p className={"text-sm font-bold"}>Email: {user ? user.email : ""}</p>
    </div>
}