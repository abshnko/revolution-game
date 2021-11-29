import React from "react";
import "../../styles/main/rules.css";

const Rules = ({ setIsShowRules }) => {
  return (
    <div className="rules">
      <div className="upper-part">
        <div className="years">
          <div>
            1900
            <br />
            &emsp;-1953
          </div>
          <p>Правила игры</p>
        </div>
        <div className="title">Человек в эпоху войн и революций</div>
        <div className="start-button">
          <button onClick={() => setIsShowRules(false)}>
            <img
              src={process.env.PUBLIC_URL + `/images/red-arrow.png`}
              alt="arrow"
            />
          </button>
          <p>начать игру</p>
        </div>
      </div>
      <hr className="hr" />
      <div className="description">
        <div className="left">
          <h3> &laquo;Поздравляю, Вы родились в 1900 году!&raquo;</h3>
          <p>
            В Ваших руках жизнь человека, родившегося волею судеб в Российской
            Империи в 1900 году. От правильности Вашего выбора будет зависеть,
            переживет ли Ваш герой очередное историческое событие или же будет
            сметен с исторической авансцены вихрем российской истории первой
            половины XX века.
          </p>
          <hr className="small-hr" />
        </div>
        <div className="right">
          <h4 className="red">
            Главная цель – выжить любой ценой и дожить до 1953 года!
          </h4>
          <p>
            Отталкивайтесь от своих знаний по истории России. Делайте зачастую
            идеологически верный выбор и переживите столь непростое время!
            Удачи!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
