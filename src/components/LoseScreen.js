import React from "react";

const LoseScreen = ({ grade, achivedItems }) => {
  return (
    <div className="loseScreen">
      <h5>*полученные предметы*</h5> {/* achieved items*/}
      <h4>Оценка: {grade}</h4>
    </div>
  );
};

export default LoseScreen;
