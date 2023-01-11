import { Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-scroll";

export default function NavigationButton({
  title,
  linkTo,
  onClick,
}: {
  title: string;
  linkTo: string;
  onClick: () => void;
}) {
  return (
    <Typography
      as="li"
      className="p-1 font-normal font-bold hover:text-accentColor cursor-pointer"
    >
      <Link to={linkTo} onClick={onClick} duration={100000}>
        {title}
      </Link>
    </Typography>
  );
}
