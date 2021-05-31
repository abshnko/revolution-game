import React from "react";
import { FaSpinner } from "react-icons/fa";

function Loading(props) {
  return (
    <div className="spinner">
      <i>
        <FaSpinner />
      </i>
    </div>
  );
}

export default Loading;
