import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../actions/questions";
import { useSelector } from "react-redux";
import Gameplay from "./Gameplay";

function GamePage({ questions, adminMode, setAdminMode }) {
  const initialState = {
    text: "",
    year: "",
    id: 0,
    period: "",
    img: "",
    options: [],
    isInfo: false,
    infos: [],
  };
  const dispatch = useDispatch();
  const [currentQuestionID, setCurrentQuestionID] = useState(null);
  const questionToUpdate = useSelector((store) =>
    currentQuestionID
      ? store.questions.find((question) => question._id === currentQuestionID)
      : null
  );
  const [questionInitialState, setQuestionInitialState] = useState(
    questionToUpdate ? questionToUpdate : initialState
  );
  const [showModalQuestion, setShowModalQuestion] = useState(false);
  const [alertDeleteQuestion, setAlertDeleteQuestion] = useState(false);
  const [idForDelete, setIdForDelete] = useState(null);

  return (
    <>
      <div className="game-page">
        <Gameplay
          dispatch={dispatch}
          questions={questions}
          adminMode={adminMode}
          setAdminMode={setAdminMode}
          setCurrentQuestionID={setCurrentQuestionID}
          setShowModalQuestion={setShowModalQuestion}
          showModalQuestion={showModalQuestion}
          setIdForDelete={setIdForDelete}
          setAlertDeleteQuestion={setAlertDeleteQuestion}
          questionToUpdate={questionToUpdate}
          alertDeleteQuestion={alertDeleteQuestion}
          idForDelete={idForDelete}
          initialState={initialState}
          currentQuestionID={currentQuestionID}
          questionInitialState={questionInitialState}
          setQuestionInitialState={setQuestionInitialState}
          deleteQuestion={deleteQuestion}
        />
      </div>
    </>
  );
}

export default GamePage;
