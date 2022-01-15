import React, { useState, useEffect } from "react";
import Editing from "./EditingPage/editing";
import "../../styles/adminPage/adminPage.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyAboutWrongPassword } from "../../utils/notifyers";

const AdminPage = ({ questions, setAdminMode }) => {
  const [passwordOK, setPasswordOK] = useState(false); //change to false --- JWT token
  const [question, setQuestion] = useState(() => {
    const saved = localStorage.getItem("question");
    const initialValue = JSON.parse(saved);
    if (initialValue !== null) {
      return initialValue;
    } else return questions;
  });

  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const history = useHistory();

  useEffect(() => {
    console.log(password);
  });
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("IN HANDLE LOGIN");
    if (login === "admin" && password === "admin") {
      setAdminMode(true);
      history.push("/revolution-game/game");
      setLogin("");
      setPassword("");
    } else {
      console.log("IN ELSE");
      notifyAboutWrongPassword();
    }
  };
  return (
    <>
      <div className="admin-page">
        <div className="admin-page-modal">
          <form className="authenticate-card" onSubmit={(e) => handleLogin(e)}>
            <h2>Введите логин и пароль:</h2>
            <label htmlFor="">
              <input
                type="text"
                onChange={(e) => setLogin(e.target.value)}
                value={login}
                placeholder="логин"
              />
            </label>
            <label htmlFor="">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="пароль"
              />
            </label>
            <button type="submit" className="login-button">
              Войти
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AdminPage;
