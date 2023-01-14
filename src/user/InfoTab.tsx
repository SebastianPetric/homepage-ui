import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMobile,
  FaXing,
} from "react-icons/all";
import EditInfoModal from "./EditInfoModal";
import { useSelector } from "react-redux";
import { TUserInfo } from "./UserSlice";

export default function InfoTab() {
  const info: TUserInfo = useSelector((state: any) => {
    return state.user.info;
  });

  return (
    <div className={"flex flex-col"}>
      <EditInfoModal info={info} />
      <p className={"text-xl font-bold mb-2 text-accentColor"}>
        {info ? info.first_name : ""} {info ? info.last_name : ""}
      </p>
      <div className={"flex flex-row items-center"}>
        <FaMobile className={"mr-2"} />
        <p className={"text-sm font-bold"}>{info ? info.phone : ""}</p>
      </div>

      <div className={"flex flex-row items-center mt-2"}>
        <FaEnvelope className={"mr-2"} />
        <p className={"text-sm font-bold"}>{info ? info.email : ""}</p>
      </div>

      <div className={"flex flex-row mt-5"}>
        <div className={"mr-4"}>
          <a href={info.github_link} target="_blank">
            <FaGithub className={"hover:text-accentColor text-2xl"} />
          </a>
        </div>
        <div className={"mr-4"}>
          <a href={info.linkedin_link} target="_blank">
            <FaLinkedin className={"hover:text-accentColor text-2xl"} />
          </a>
        </div>
        <div className={"mr-4"}>
          <a href={info.xing_link} target="_blank">
            <FaXing className={"hover:text-accentColor text-2xl"} />
          </a>
        </div>
      </div>
    </div>
  );
}
