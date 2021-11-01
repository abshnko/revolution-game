import React from "react";

function Image({ question, setImgLoaded, isLoading, imgLoaded }) {
  return (
    <div className="img-container">
      {question[0].img !== "" ? (
        <img
          className="headImage"
          src={process.env.PUBLIC_URL + `/images/${question[0].img}`}
          style={!isLoading ? {} : { display: "none" }}
          alt="img here"
          onLoad={() => setImgLoaded(true)}
        />
      ) : null}

      {question[0].imgRef !== "" && imgLoaded && (
        <div className="img-ref">
          <a href={question[0].imgRef}>источник</a>
        </div>
      )}
    </div>
  );
}

export default Image;
