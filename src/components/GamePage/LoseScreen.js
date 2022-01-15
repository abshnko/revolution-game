import React from "react";

const LoseScreen = ({ achieved, question }) => {
  return (
    <div className="lose-screen">
      <div className="announcement">
        {question[0].year === "1953" ? (
          <h2>Поздравляем, вы выжили!</h2>
        ) : (
          <h2>К сожалению, вам не удалось выжить</h2>
        )}
      </div>
      <div className="achievements">
        Вот через что вам пришлось пройти: (тут вехи)
      </div>
    </div>
  );
};

export default LoseScreen;
