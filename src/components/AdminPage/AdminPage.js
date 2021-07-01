import React, { useState } from "react";
import Editing from "./EditingPage/editing";
import "../../styles/adminPage/adminPage.css";

const AdminPage = ({ questions }) => {
  const [passwordOK, setPasswordOK] = useState(true); //change to false --- come up with better security!!!
  return (
    <>
      <div className="admin-page">
        {!passwordOK && (
          <div className="authenticate-card">
            <h2>Admin authorization</h2>
          </div>
        )}
      </div>
      {passwordOK && <Editing questions={questions} />}
    </>
  );
};

export default AdminPage;
