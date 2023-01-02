import logo from "../assets/profilefoto.jpg";

export const ProfileImage = () => {
  return (
    <>
      <div className={"flex items-center justify-center flex-col"}>
        <img
          className={"rounded-3xl w-3/4 object-scale-down mt-16"}
          src={logo}
          alt={"profile"}
        />
      </div>
    </>
  );
};
