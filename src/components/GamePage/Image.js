import React from "react";

function Image({ question, setImgLoaded, isLoading }) {
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
