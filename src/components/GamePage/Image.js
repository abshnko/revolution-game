import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Image({ question, setImgLoaded, isLoading, imgLoaded, adminMode }) {
  return (
    <div className="img-container">
      {question[0].img !== "" ? (
        <>
          <img
            className="headImage"
            src={process.env.PUBLIC_URL + `/images/${question[0].img}`}
            style={!isLoading ? {} : { display: "none" }}
            alt="img here"
            onLoad={() => setImgLoaded(true)}
          />
        </>
      ) : null}
    </div>
  );
}

export default Image;
