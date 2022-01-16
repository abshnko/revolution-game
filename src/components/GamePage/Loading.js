import React from "react";
import { FaSpinner } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function Loading({ loading, entryPoint }) {
  return (
    // <div
    //   className="spinner"
    //   style={{
    //     alignSelf: "center",
    //     justifySelf: "center",
    //     textAlign: "center",
    //   }}
    // >
    <ClipLoader loading={loading} size={140} speedMultiplier={0.4} />
    // </div>
  );
}

export default Loading;
