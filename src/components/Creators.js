import React from "react";
import "../styles/main/creators.css";
import { Link } from "react-router-dom";

const Creators = () => {
  return (
    <div className="creators">
      <Link
        to="/"
        style={{ textDecoration: "none" }}
        className="back-button-row"
      >
        <button className="back-button">Назад</button>
      </Link>
      <h3 className="title">Команда проекта</h3>
      <h5 className="subtitle">
        человек в&nbsp;эпоху<br></br>войн и&nbsp;революций
      </h5>

      <p className="main-creators">
        <span>Идея</span> - Сергей Соколов, к.и.н., заведующий кафедрой истории
        России УрФУ <br></br>
        <span>Куратор проекта</span> – Владислав Ившин, ассистент кафедры
        истории России УрФУ<br></br>
        <span>Редактор</span> – Сергей Рябов, ассистент кафедры истории России
        УрФУ
      </p>
      <div className="female-line">
        <span>Текст женской ветки:</span>
        <p className="female-line-text">
          Юлия Куськало, магистрант «Отечественной истории» УрФУ (2020–2022)
          <br></br>
          Елена Алексеева, магистрант «Отечественной истории» УрФУ (2020–2022)
          <br></br>
          Иван Ерёменко, магистрант «Отечественной истории» УрФУ (2020–2022)
        </p>
      </div>
      {/* </div> */}
      {/* <div className="creators-info-bottom-row"></div> */}
      <div className="male-line">
        <span>Текст мужской ветки:</span>
        <p className="male-line-text">
          Андрей Кулинский, магистрант «Отечественной истории» УрФУ (2020–2022)
          <br></br>
          Никита Гилевич, магистрант «Отечественной истории» УрФУ (2020–2022)
          <br></br>
          Галина Лысенко, магистрант «Отечественной истории УрФУ (2020–2022)
          <br></br>
          Дмитрий Макаров, магистрант «Отечественной истории» УрФУ (2020–2022)
        </p>
      </div>
      <div className="tech-team">
        <span>Техническая разработка:</span>
        <p className="tech-team-text">
          Егор Ларионов, тимлид <br></br>
          Дарья Абушенко, ведущий разработчик<br></br>
          Татьяна Теплова, UI/UX <br></br>
          Семен Проданчук, разработчик <br></br>
          Кирилл Торсунов, UI <br></br>
          Дизайн – Юлия Исаева, ведущий дизайнер UI/UX
        </p>
      </div>
      <div className="line">
        <hr />
      </div>
    </div>
  );
};

export default Creators;
