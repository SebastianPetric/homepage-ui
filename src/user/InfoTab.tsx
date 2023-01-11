import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMobile,
  FaXing,
} from "react-icons/all";
import EditInfoModal from "./EditInfoModal";

export type TUserInfo = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  github_link: string;
  linkedin_link: string;
  xing_link: string;
};

export type TUserInfoDTO = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  github_link: string;
  linkedin_link: string;
  xing_link: string;
};

export default function InfoTab({
  user,
  onSaveEditedModel,
  isEditActive,
}: {
  user: TUserInfo;
  onSaveEditedModel: (user: TUserInfo) => void;
  isEditActive: boolean;
}) {
  return (
    <div className={"flex flex-col"}>
      <EditInfoModal
        isEditActive={isEditActive}
        onSaveUserInfo={onSaveEditedModel}
        editUserInfoObj={user}
      />
      <p className={"text-xl font-bold mb-2 text-accentColor"}>
        {user ? user.first_name : ""} {user ? user.last_name : ""}
      </p>
      <div className={"flex flex-row items-center"}>
        <FaMobile className={"mr-2"} />
        <p className={"text-sm font-bold"}>{user ? user.phone : ""}</p>
      </div>

      <div className={"flex flex-row items-center mt-2"}>
        <FaEnvelope className={"mr-2"} />
        <p className={"text-sm font-bold"}>{user ? user.email : ""}</p>
      </div>

      <div className={"flex flex-row mt-5"}>
        <div className={"mr-4"}>
          <a href={user.github_link} target="_blank">
            <FaGithub className={"hover:text-accentColor text-2xl"} />
          </a>
        </div>
        <div className={"mr-4"}>
          <a href={user.linkedin_link} target="_blank">
            <FaLinkedin className={"hover:text-accentColor text-2xl"} />
          </a>
        </div>
        <div className={"mr-4"}>
          <a href={user.xing_link} target="_blank">
            <FaXing className={"hover:text-accentColor text-2xl"} />
          </a>
        </div>
      </div>
    </div>
  );
}
