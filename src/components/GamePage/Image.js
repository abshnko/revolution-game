import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Image({ question, setImgLoaded, isLoading, imgLoaded, adminMode }) {
  const showUploadedImage = question[0].img.includes("data:");
  return (
    <div className="img-container">
      {question[0].img !== "" ? (
        <>
          <img
            className="headImage"
            src={
              showUploadedImage
                ? question[0].img
                : process.env.PUBLIC_URL + `/images/${question[0].img}`
            }
            // src={question[0].img}
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
