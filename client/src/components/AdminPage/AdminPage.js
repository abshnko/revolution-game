import React, { useState, useEffect } from "react";
import Editing from "./EditingPage/editing";
import "../../styles/adminPage/adminPage.css";
import { Link } from "react-router-dom";

const AdminPage = ({ questions, setAdminMode }) => {
  const [passwordOK, setPasswordOK] = useState(true); //change to false --- JWT token
  const [question, setQuestion] = useState(() => {
    const saved = localStorage.getItem("question");
    const initialValue = JSON.parse(saved);
    if (initialValue !== null) {
      return initialValue;
    } else return questions;
  });

  useEffect(() => {
    console.log(questions);
    console.log(question);
  });
  const onClick = () => {};
  return (
    <>
      <div className="admin-page">
        {!passwordOK && (
          <div className="authenticate-card">
            <h2>Введите пароль:</h2>
            <input type="text" />
            <button>Войти</button>
          </div>
        )}
      </div>
      {passwordOK && (
        <>
          <button onClick={() => setAdminMode(true)}>
            <Link to={process.env.PUBLIC_URL + "/game"}>
              Перейти к редактированию
            </Link>
          </button>
          {question.map((question) => {
            return <div className="">{question.text.substring(0, 50)}</div>;
          })}
        </>
      )}
    </>
  );
};

export default AdminPage;
