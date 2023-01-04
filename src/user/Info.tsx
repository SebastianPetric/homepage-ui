import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import InfoTab, { TUserInfo, TUserInfoDTO } from "./InfoTab";
import {
  findAllEntities,
  findTextByType,
  updateEntity,
} from "../shared/RestCaller";
import EditDescriptionTextModal, {
  TextType,
  TText,
} from "../shared/modals/EditDescriptionTextModal";
import DescriptionText, {
  onSaveDescriptionText,
} from "../shared/description/DescriptionText";
import CveRequest from "./CveRequest";

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
    await onSaveDescriptionText(cur, COVERING_ENDPOINT, setTextObj);
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
      <p className={"title"}>Interesse geweckt?</p>
      <div className={"mt-8"}>
        {isLoaded && (
          <EditDescriptionTextModal
            onSaveText={onSaveEditedText}
            editTextObj={textObj}
            isEditActive={isEditActive}
          />
        )}
      </div>
      <DescriptionText text={textObj.text} />
      <div className={"tile-group"}>
        {user.map((exp: TUserInfo, index: number) => (
          <InfoTab
            key={`${exp.id}-${index}`}
            user={{ ...exp }}
            onSaveEditedModel={onSaveEditedUserInfo}
            isEditActive={isEditActive}
          />
        ))}
      </div>
      <CveRequest />
    </div>
  );
}
