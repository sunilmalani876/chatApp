import React from "react";
import notfound from "../../public/404.gif";

const NotFound = () => {
  const title = `{" Status: 404,`;
  const heading = ` message: No user selected "}`;
  return (
    <div className="flex flex-col items-center justify-center my-auto">
      <img src={notfound} alt="nothing selected" width={250} height={250} />
      <div className="flex flex-col text-2xl text-white/80 font-bold">
        {`{ status: 404, `}
        <br /> &nbsp; message: {`“ No User Selected. ” }`}
      </div>
      <p className="pt-2 text-neutral-300/80">
        Please select a user to start a chat...🍻{" "}
      </p>
    </div>
  );
};

export default NotFound;
