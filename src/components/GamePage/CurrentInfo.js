import React from "react";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CurrentInfo = ({
  question,
  setIsShowInfo,
  INFOS,
  currentInfoDisplayed,
}) => {
  const [show, setShow] = useState(false);

  const style =
    "img" in currentInfoDisplayed && currentInfoDisplayed.img !== ""
      ? "modal"
      : "no-img-modal";
  return (
    <>
      {/* <CSSTransition
        in={show}
        timeout={300}
        classNames="alert"
        component={null}
      > */}
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
            {currentInfoDisplayed.img !== "" ? (
              <img
                src={
                  process.env.PUBLIC_URL + `/images/${currentInfoDisplayed.img}`
                }
                alt=""
                onLoad={() => setShow(true)}
              />
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
      {/* </CSSTransition> */}
    </>
  );
};

export default CurrentInfo;
