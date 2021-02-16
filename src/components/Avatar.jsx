import React, { useState } from "react";
import classNames from "classnames";
const Avatar = ({name='', size}) => {
  // const [size, setSize] = useState("");
  // const [name, setName] = useState("");

  let container = classNames("avatar", size);

  const extraerIniciales = () => {
    return name
      .split(" ")
      .map((item) => item.charAt(0))
      .slice(0, 3)
      .join("");
  };

  return <div className={container}>
     <span>{extraerIniciales()}</span>
  </div>;
};

export default Avatar;
