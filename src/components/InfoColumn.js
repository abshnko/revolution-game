import React from "react";

const InfoColumn = ({ period, setIsShowInfoEntries, chooseDisplayedInfo }) => {
  return (
    <div className="single-period">
      <button
        className="period-btn"
        onClick={() => setIsShowInfoEntries(period.id)}
      >
        {period.period}
      </button>
      {period.isShowEntries &&
        period.infos.map((info) => {
          return (
            <>
              <div className="info-single-entry">
                <button
                  onClick={() => chooseDisplayedInfo(info.infoId)}
                  className={`info-btn ${info.isActive ? "active-entry" : ""}`}
                >
                  {info.infoName}
                </button>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default InfoColumn;
