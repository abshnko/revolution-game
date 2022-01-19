import React from "react";
import { useState } from "react";
import Loading from "./Loading";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const CurrentInfo = ({
  question,
  setIsShowInfo,
  currentInfoDisplayed,
  isShowInfo,
}) => {
  const [show, setShow] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const style =
    "img" in currentInfoDisplayed && currentInfoDisplayed.img !== ""
      ? "modal"
      : "no-img-modal";
  return (
    <>
      <CSSTransition
        in={isShowInfo}
        timeout={300}
        classNames="alert"
        component={null}
      >
        <div className={`${style}`} id={question[0].id}>
          <div className="current-info">
            <div className="info-name">
              <h2>{currentInfoDisplayed.name}</h2>
            </div>
            <div className="info-text">
              <p>{currentInfoDisplayed.text}</p>
            </div>
            <div className="hr">
              <hr />
            </div>
          </div>
          <div className="right-column">
            <div className="img">
              {"img" in currentInfoDisplayed &&
              currentInfoDisplayed.img !== "" ? (
                <>
                  {!imgLoaded &&
                    setTimeout(() => {
                      return <Loading />;
                    }, 1000)}
                  <img
                    src={
                      currentInfoDisplayed.img.includes("data:")
                        ? currentInfoDisplayed.img
                        : process.env.PUBLIC_URL +
                          `/images/${currentInfoDisplayed.img}`
                    }
                    alt=""
                    onLoad={() => {
                      setImgLoaded(true);
                      setShow(true);
                    }}
                  />
                </>
              ) : null}
            </div>
            <div className="close-info">
              <button
                onClick={() => {
                  setShow(false);
                  setTimeout(() => {
                    setIsShowInfo(false);
                  }, 100);
                }}
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default CurrentInfo;
