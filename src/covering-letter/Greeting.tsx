import { useEffect } from "react";
import {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import DescriptionText from "../shared/description/DescriptionText";
import { useSelector } from "react-redux";
import { getUserInfo, TUserInfo } from "../user/UserSlice";
import { getDescriptionByType, getStateByType } from "./DescriptionTextSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export default function Greeting() {
  const info: TUserInfo = useSelector((state: any) => {
    return state.user.info;
  });
  const dispatch = useAppDispatch();

  const description: TText = useAppSelector((state) =>
    getStateByType(state, TextType.COVERING)
  );

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getDescriptionByType(TextType.COVERING));
  }, []);

  return (
    <div className={"flex flex-col"}>
      <p className={"title"}>
        {info.first_name.concat(" ").concat(info.last_name)}
      </p>
      <DescriptionText type={TextType.COVERING} description={description} />
    </div>
  );
}
