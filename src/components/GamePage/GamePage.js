import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../actions/questions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/main/style.css";

import Rules from "./Rules";
import Gameplay from "./Gameplay";
import Creators from "./Creators";

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

  //   const [currentOptionID, setCurrentOptionID] = useState(null);
  //   const [currentInfoID, setCurrentInfoID] = useState(null);

  //  const questions = useSelector((store) => store.questions);

  //   const [showModalOptions, setShowModalOptions] = useState(false);
  //   const [showInfos, setShowInfos] = useState(false);
  //   const optionToUpdate = currentOptionID
  //     ? question.options.find((option) => option.id === currentOptionID)
  //     : null;

  //   const [alertDeleteInfos, setAlertDeleteInfos] = useState(false);
  //   const [imgLoaded, setImgLoaded] = useState(false);
  //   const [line, setLine] = useState("unset");

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
