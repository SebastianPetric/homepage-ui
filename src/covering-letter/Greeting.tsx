import { useEffect } from "react";
import EditDescriptionTextModal, {
  TextType,
  TText,
} from "../shared/description/EditDescriptionTextModal";
import DescriptionText from "../shared/description/DescriptionText";
import { TUserInfo } from "../user/InfoTab";
import { useSelector } from "react-redux";
import { getUserInfo } from "../user/UserSlice";
import { getDescriptionByType, getStateByType } from "./DescriptionTextSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export default function Greeting() {
  const { info }: { info: TUserInfo } = useSelector((state: any) => {
    return state.user;
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
      <div className={"mt-8"}>
        <EditDescriptionTextModal type={TextType.COVERING} />
      </div>
      <DescriptionText description={description} />
    </div>
  );
}
