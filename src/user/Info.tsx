import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import InfoTab, { TUserInfo, TUserInfoDTO } from "./InfoTab";
import {
  findAllEntities,
  findTextByType,
  updateEntity,
} from "../shared/RestCaller";
import EditTextModal, {
  TextType,
  TText,
  TTextDTO,
} from "../shared/modals/EditTextModal";

export default function Info({ isEditActive }: { isEditActive: boolean }) {
  const [user, setUser] = useState<TUserInfo[]>([]);
  const [textObj, setTextObj] = useState<TText>({ id: "", text: "", type: "" });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const COVERING_ENDPOINT = "covering-letter";

  useEffect(() => {
    const getAllUserInfo = async () => {
      let response: TUserInfo[] = await findAllEntities("users");
      setUser(response);
    };

    const getCoveringLetter = async () => {
      let response: TText = await findTextByType(TextType.INFO);
      setTextObj(response);
      setIsLoaded(true);
    };

    if (!!inView) {
      getAllUserInfo();
      getCoveringLetter();
    }
  }, [inView]);

  const onSaveEditedText = async (cur: TText) => {
    const textDt: TTextDTO = {
      text: cur.text,
      type: cur.type,
    };

    const saved: TText = await updateEntity(
      COVERING_ENDPOINT,
      cur.id,
      JSON.stringify(textDt)
    );
    setTextObj(saved);
  };

  const onSaveEditedUserInfo = async (cur: TUserInfo) => {
    const dto: TUserInfoDTO = {
      first_name: cur.first_name,
      last_name: cur.last_name,
      phone: cur.phone,
      email: cur.email,
      github_link: cur.github_link,
      linkedin_link: cur.linkedin_link,
      xing_link: cur.xing_link,
    };

    const saved: TUserInfo = await updateEntity(
      "users",
      cur.id,
      JSON.stringify(dto)
    );
    const tmp = [...user];
    tmp[0] = saved;
    setUser(tmp);
  };

  return (
    <div ref={ref} className={"flex flex-col"}>
      <p className={"text-5xl font-bold"}>Interesse geweckt?</p>
      <span className={"w-96 h-auto mt-8"}>
        {isLoaded && (
          <EditTextModal
            onSaveText={onSaveEditedText}
            editTextObj={textObj}
            isEditActive={isEditActive}
          />
        )}
        <p dangerouslySetInnerHTML={{ __html: textObj.text }}></p>
      </span>
      <div className={"flex flex-wrap justify-start mt-8"}>
        {user.map((exp: TUserInfo, index: number) => (
          <InfoTab
            key={`${exp.id}-${index}`}
            user={{ ...exp }}
            onSaveEditedModel={onSaveEditedUserInfo}
            isEditActive={isEditActive}
          />
        ))}
      </div>
      <a
        href={""}
        target="_blank"
        className={
          "bg-green-500 w-auto h-20 rounded-br-3xl flex items-center justify-center text-xl font-bold hover:text-white cursor-pointer mt-10"
        }
      >
        Lebenslauf herunterladen
      </a>
    </div>
  );
}
