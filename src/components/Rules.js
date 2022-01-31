import React, { useEffect, useState } from "react";
import "../styles/main/rules.scss";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

const Rules = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className="rules">
      <div className="upper-part-wrap">
        <div className="upper-part">
          <div className="years">
            <div>
              1900
              <br />
              &emsp;-1953
            </div>
            <p>Правила игры</p>
          </div>
          <div className="title">Человек в эпоху войн и&nbsp;революций</div>
          <div className="start-button">
            <Link to="/game">
              <button>
                <img
                  src={process.env.PUBLIC_URL + `/images/red-arrow.png`}
                  alt="arrow"
                />
              </button>
            </Link>

            <p>начать игру</p>
          </div>
        </div>
        <hr className="hr" />
      </div>
      <div className="description">
        <div className="left">
          <div className="content">
            <CSSTransition in={show} timeout={300} classNames="alert">
              <h3>
                &laquo;Поздравляю,
                <br /> Вы родились в 1900 году!&raquo;
              </h3>
            </CSSTransition>
            <p>
              В Ваших руках жизнь человека, родившегося волею судеб
              в&nbsp;Российской Империи в&nbsp;1900&nbsp;году.
              От&nbsp;правильности Вашего выбора будет зависеть, переживет
              ли&nbsp;Ваш&nbsp;герой очередное историческое событие
              или&nbsp;же&nbsp;будет сметен с&nbsp;исторической авансцены вихрем
              российской истории первой половины XX&nbsp;века.
            </p>
          </div>
          <div className="line">
            <hr className="small-hr" />
          </div>
        </div>
        <div className="right">
          <Link
            to="/creators"
            style={{ textDecoration: "none" }}
            className="creators-link"
          >
            <button className="creators-button">
              Команда
              <br />
              проекта
            </button>
          </Link>
          <div>
            <h4 className="red">
              Главная цель – выжить любой ценой
              <br />
              и&nbsp;дожить&nbsp;до&nbsp;1953&nbsp;года!
            </h4>
            <p>
              Отталкивайтесь от своих знаний по&nbsp;истории России. Делайте
              зачастую идеологически верный выбор и&nbsp;переживите столь
              непростое время! Удачи!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
