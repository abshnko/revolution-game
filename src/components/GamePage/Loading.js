import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loading({ loading, entryPoint }) {
  return <ClipLoader loading={loading} size={140} speedMultiplier={0.4} />;
}

export default Loading;
