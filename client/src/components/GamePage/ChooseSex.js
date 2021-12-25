import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ChooseSex = ({
  question,
  nextClick,
  isLoading,
  setImgLoaded,
  imgLoaded,
}) => {
  const [go, setGo] = useState(false);
  useEffect(() => {
    console.log("IN USEEFFECT");
    const time = setTimeout(() => {
      setGo(true);
    }, 300);
    return () => clearTimeout(time);
  }, [imgLoaded]);
  return (
    <>
      <div className={`options-choose-sex ${go ? "" : "hidden"}`}>
        <h2 className="question">{question[0].text}</h2>
        <div className={`options`}>
          <div className="choose-images">
            {question[0].options.map((option) => {
              return (
                <>
                  <button
                    className={`option ${option.isActive ? "active" : ""}`}
                    key={option.id}
                    onClick={() =>
                      nextClick(option.id, option.isActive, option.next)
                    }
                  >
                    {/* {imgLoaded && ( */}
                    <>
                      <div className="number">{option.id}</div>
                      <div className="rect1"></div>
                      <div className="rect2"></div>
                      <div className="rect3"></div>
                      <div className="rect4"></div>
                    </>

                    <img
                      className="headImageChoose"
                      src={process.env.PUBLIC_URL + `/images/${option.img}`}
                      style={!isLoading ? {} : { display: "none" }}
                      alt="img here"
                      onLoad={() => setImgLoaded(true)}
                    />
                  </button>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseSex;
