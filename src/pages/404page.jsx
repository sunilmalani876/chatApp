/* eslint-disable react/prop-types */
// import React from "react";
import notfound from "../../public/404.gif";

const NotFound = ({
  title = `message: “ No User Selected. ” `,
  heading = "Please select a user to start a chat...🍻",
}) => {
  return (
    <div className="flex flex-col items-center justify-center my-auto">
      <img src={notfound} alt="nothing selected" width={250} height={250} />
      <div className="flex flex-col text-2xl text-white/80 font-bold">
        <br /> {title}
      </div>
      <p className="pt-2 text-neutral-300/80">{heading}</p>
    </div>
  );
};

export default NotFound;
