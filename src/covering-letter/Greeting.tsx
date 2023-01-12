import { useEffect, useState } from "react";
import EditDescriptionTextModal, {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import { findTextByType } from "../shared/RestCaller";
import DescriptionText, {
  onSaveDescriptionText,
} from "../shared/description/DescriptionText";
import { ENDPOINT } from "../App";
import { TUserInfo } from "../user/InfoTab";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../user/UserSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import reducers from "../reducers/Reducers";

export default function Greeting({ isEditActive }: { isEditActive: boolean }) {
  const [textObj, setTextObj] = useState<TText>({ id: "", text: "", type: "" });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { info }: { info: TUserInfo } = useSelector((state: any) => {
    return state.user;
  });
  const dispatch =
    useDispatch<ThunkDispatch<ReturnType<typeof reducers>, any, AnyAction>>();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    const getCoveringLetter = async () => {
      let response: TText = await findTextByType(TextType.COVERING);
      setTextObj(response);
      setIsLoaded(true);
    };
    getCoveringLetter();
  }, []);

  const onSaveText = async (cur: TText) => {
    await onSaveDescriptionText(
      cur,
      ENDPOINT.COVERING_LETTER.valueOf(),
      setTextObj
    );
  };

  return (
    <div className={"flex flex-col"}>
      <p className={"title"}>
        {info.first_name.concat(" ").concat(info.last_name)}
      </p>
      <div className={"mt-8"}>
        {isLoaded && (
          <EditDescriptionTextModal
            onSaveText={onSaveText}
            editTextObj={textObj}
            isEditActive={isEditActive}
          />
        )}
      </div>
      <DescriptionText text={textObj.text} />
    </div>
  );
}
