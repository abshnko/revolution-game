import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const CurrentInfo = ({
  question,
  setIsShowInfo,
  INFOS,
  currentInfoDisplayed,
}) => {
  return (
    <div className="card" id={question[0].id}>
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
          <i>
            <AiOutlineClose />
          </i>
        </button>
      </div>
      <div className="current-info">
        <div className="infoName">
          <h2>{currentInfoDisplayed.infoName}</h2>
        </div>
        {/* <div className="img-container">
                  <img className="headImage" src={placeholder} alt="img here" />
                </div> */}

        <div className="info-text">
          <p>{currentInfoDisplayed.infoText}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentInfo;
