import React from "react";

type PropsType = {
  room: string;
  on: boolean;
};

const Light = ({ room, on }: PropsType) => {
  console.log(room, on);
  return <div>{on ? "💡" : "⬛"}</div>;
};

export default React.memo(Light);
