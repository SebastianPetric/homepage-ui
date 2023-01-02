import logo from "../assets/profilefoto.jpg";

export const ProfileImage = () => {
  return (
    <>
      <div className={"flex justify-center px-10 xl:px-0"}>
        <img
          className={"rounded-3xl xl:w-3/4 object-scale-down"}
          src={logo}
          alt={"profile"}
        />
      </div>
    </>
  );
};
