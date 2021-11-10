import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const CurrentInfo = ({
  question,
  setIsShowInfo,
  INFOS,
  currentInfoDisplayed,
}) => {
  return (
    <>
      <div className="blur"></div>
      <div className="modal" id={question[0].id}>
        <div className="current-info">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="info-name">
            <h2>{currentInfoDisplayed.infoName}</h2>
          </div>
          {/* <div className="img-container">
                  <img className="headImage" src={placeholder} alt="img here" />
                </div> */}

          <div className="info-text">
            <p>{currentInfoDisplayed.infoText}</p>
          </div>
        </div>
        <div className="close-info">
          <button
            onClick={() => {
              setIsShowInfo(false);
              INFOS.map((INFO) => {
                INFO.infos.map((info, infoIndex) => {
                  info.isActive = false;
                });
              });
            }}
          >
            Понятно
          </button>
        </div>
      </div>
    </>
  );
};

export default CurrentInfo;
