import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react/cjs/react.development";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const CurrentInfo = ({
  question,
  setIsShowInfo,
  INFOS,
  currentInfoDisplayed,
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {/* <CSSTransition
        in={show}
        timeout={300}
        classNames="alert"
        component={null}
      > */}
      <div className="modal" id={question[0].id}>
        <div className="current-info">
          <div className="info-name">
            <h2>{currentInfoDisplayed.infoName}</h2>
          </div>
          <div className="info-text">
            <p>{currentInfoDisplayed.infoText}</p>
          </div>
          <div className="hr">
            <hr />
          </div>
        </div>
        <div className="right-column">
          <div className="img">
            {"infoImg" in currentInfoDisplayed ? (
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/images/${currentInfoDisplayed.infoImg}`
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
