import React from "react";

const LoseScreen = ({ grade, achivedItems }) => {
  return (
    <div>
      <h3>Вы умерли</h3>
      <h5>*полученные предметы*</h5> {/* achieved items*/}
      <h4>Оценка: {grade}</h4>
    </div>
  );
};

export default LoseScreen;
