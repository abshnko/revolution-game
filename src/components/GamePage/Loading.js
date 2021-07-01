import React from "react";
import { FaSpinner } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

function Loading(props) {
  return (
    <div className="spinner">
      <i>
        <CgSpinner />
      </i>
    </div>
  );
}

export default Loading;
