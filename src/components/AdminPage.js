import React, { useState } from "react";
import "../styles/adminPage/adminPage.css";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyAboutWrongPassword } from "../utils/notifyers";

const AdminPage = ({ setAdminMode }) => {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login === "admin" && password === "admin1234") {
      setAdminMode(true);
      history.push("/game");
      setLogin("");
      setPassword("");
    } else {
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
