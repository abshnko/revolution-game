import React from "react";
import { useState } from "react";
import FileBase from "react-file-base64";

function Image({ question, setImgLoaded, isLoading, imgLoaded, adminMode }) {
  const [imageState, setImageState] = useState(question[0].img);
  const handleSubmit = () => {};
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
      ) : (
        //get rid of adminMode here
        adminMode && (
          <>
            <form action="" onSubmit={handleSubmit}>
              <FileBase
                type="file"
                multipple={false}
                onDone={({ base64 }) => setImageState(base64)}
              />
              <button type="submit">Submit</button>
            </form>
          </>
        )
      )}

      {/* {question[0].imgRef !== "" && imgLoaded && (
        <div className="img-ref">
          <a href={question[0].imgRef}>источник</a>
        </div>
      )} */}
    </div>
  );
}

export default Image;
