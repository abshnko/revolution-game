import React from "react";
import { useState, useEffect } from "react";
import "../../styles/main/style.scss";
import { CSSTransition } from "react-transition-group";
import { css } from "@emotion/react";
import Question from "./Question";
import Image from "./Image";
import CurrentInfo from "./CurrentInfo";
import Loading from "./Loading";
import ChooseSex from "./ChooseSex";
import Timeline from "./Timeline";
import EditQuestion from "./Editing/EditQuestion";
import QuestionMap from "./Editing/QuestionMap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyAboutDelete } from "../../utils/notifyers";
import InfoTriangleBullet from "../../utils/svgs/InfoTriangleBullet";
import EditIcon from "../../utils/svgs/EditIcon";
import AddIcon from "../../utils/svgs/AddIcon";
import DeleteIcon from "../../utils/svgs/DeleteIcon";
import MapIcon from "../../utils/svgs/MapIcon";
import ExitIcon from "../../utils/svgs/ExitIcon";

const Gameplay = ({
  questions,
  adminMode,
  setAdminMode,
  setCurrentQuestionID,
  setShowModalQuestion,
  showModalQuestion,
  setIdForDelete,
  setAlertDeleteQuestion,
  dispatch,
  questionToUpdate,
  alertDeleteQuestion,
  idForDelete,
  initialState,
  currentQuestionID,
  questionInitialState,
  setQuestionInitialState,
  deleteQuestion,
}) => {
  const [index, setIndex] = useState(1000);
  const [rememberIndex, setRememberIndex] = useState(1000);
  const [show, setShow] = useState(false);
  //   const [showInfo, setShowInfo] = useState(false);
  const [question, setQuestion] = useState(() => {
    const saved = localStorage.getItem("question");
    const initialValue = JSON.parse(saved);
    if (initialValue !== null) {
      return initialValue;
    } else if (questions.length !== 0) {
      return questions;
    } else return [];
  });
  //   const [questionChanged, setQuestionChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [indexChanged, setIndexChanged] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(() => {
    const counter = parseInt(localStorage.getItem("question-number"));
    return counter || 0;
  });

  const [isJump, setIsJump] = useState(false);
  const [jump, setJump] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentInfoDisplayed, setCurrentInfoDisplayed] = useState();
  const [lose, setLose] = useState(false);
  const [showQuestionMap, setShowQuestionMap] = useState(false);

  useEffect(() => {
    const questionOnRememberedIndex = questions.filter(
      (item) => item.id === rememberIndex
    );
    if (questionOnRememberedIndex.length > 0) {
      setQuestion(questions.filter((item) => item.id === rememberIndex));
    } else {
      setQuestion(questions);
    }
  }, [questions]);

  const handleClick = () => {
    if (!isShowInfo) {
      if (index !== question[0].id) {
        setShow(false);
        setTimeout(() => {
          setImgLoaded(false);
          setIsLoading(true);
          setQuestion(questions.filter((item) => item.id === index));
          setQuestionCounter(questionCounter + 1);
          //   setQuestionChanged(true);
          //   setQuestionChanged(false);
          setIndexChanged(false);
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (questions.length !== 0) {
      checkOptions();
    }
    // setShow(true);
    if (question[0] !== undefined) {
      if ("lose" in question[0]) {
        setLose(true);
      } else {
        setLose(false);
      }
      setRememberIndex(question[0].id);
    }
  }, [question]);

  useEffect(() => {
    if (questions.length !== 0) {
      if (question[0].img === "") {
        setImgLoaded(true);
      }
    }
    // localStorage.setItem("question", JSON.stringify(question));
    // localStorage.setItem("question-number", JSON.stringify(questionCounter));
  }, [questionCounter]);

  useEffect(() => {
    const time = setTimeout(() => {
      if (imgLoaded) {
        setIsLoading(false);
      }
    }, 100);
    return () => clearTimeout(time);
  }, [imgLoaded]);

  useEffect(() => {
    isLoading ? setShow(false) : setShow(true);
  }, [isLoading]);

  useEffect(() => {
    console.log(question[0]);
  });

  const nextClick = (id, isActive, next, nextJump, jumpFromHere) => {
    if (nextJump !== 0) {
      setJump(nextJump);
    }
    if (jumpFromHere) setIsJump(true);
    setIndex(next);

    //change active option
    const i = question[0].options.findIndex((option) => option.id === id);
    const clone = [...question[0].options];
    clone[i] = { ...clone[i], isActive: true };
    const objClone = [...question];
    objClone[0] = { ...question[0], options: clone };
    setQuestion(objClone);
    question[0].options.forEach((option) => {
      option.isActive = false;
    });
    setIndexChanged(true);
  };

  //check if there's more than one option = it's a question, otherwise =it's an announcement
  const checkOptions = () => {
    if (question[0].options.length === 1) {
      if (isJump) {
        setIndex(jump);
        setIsJump(false);
      } else if ("jumpFromHere" in question[0].options[0]) {
        setIsJump(true);
        setIndex(question[0].options[0].next);
      } else {
        setIndex(question[0].options[0].next);
      }
    }
  };

  useEffect(() => {
    console.log(currentInfoDisplayed);
  }, [currentInfoDisplayed]);

  const override = css`
    display: block;
    margin: 0 auto;
    align-self: center;
  `;

  return (
    <div className="wrapper">
      <>
        {question.length === 0 ? (
          <div
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginTop: "20%",
            }}
          >
            <Loading loading={isLoading} css={override} entryPoint={true} />
          </div>
        ) : (
          <div className="container-game">
            <div className="timeline">
              <Timeline
                latestPeriod={question[0].period}
                questionCounter={questionCounter}
              />
            </div>
            {isShowInfo && //show currently chosen info entry
              currentInfoDisplayed !== undefined && (
                //??? непонятно с транзишном - сделать нормальный
                // <CSSTransition in={isShowInfo} timeout={300} classNames="alert">
                <CurrentInfo
                  question={question}
                  setIsShowInfo={setIsShowInfo}
                  currentInfoDisplayed={currentInfoDisplayed}
                  isShowInfo={isShowInfo}
                />
                // </CSSTransition>
              )}
            <div className="controls">
              {/*refactor */}
              <div className="infos">
                {"infos" in question[0]
                  ? question[0].infos.map((info) => {
                      return (
                        <div
                          className="info"
                          //   onClick={() => chooseDisplayedInfo(info.id)}
                          onClick={() => {
                            setCurrentInfoDisplayed(info);
                            setIsShowInfo(true);
                          }}
                        >
                          <InfoTriangleBullet />
                          {info.name}
                        </div>
                      );
                    })
                  : null}

                {question[0].options.map((option) => {
                  if ("infos" in option) {
                    let infos = [];
                    infos = option.infos.map((info) => {
                      return (
                        <div
                          className="info"
                          onClick={() => {
                            setCurrentInfoDisplayed(info);
                            setIsShowInfo(true);
                          }}
                        >
                          <InfoTriangleBullet />
                          {info.name}
                        </div>
                      );
                    });
                    return infos;
                  }
                  return null;
                })}
              </div>
              <div className="year">
                {question[0].year}
                <p>Человек в эпоху войн и&nbsp;революций</p>
              </div>
              {!lose && (
                <div className="next">
                  <button
                    className={`next-button ${
                      indexChanged || question[0].options.length === 1
                        ? "next-button-changed"
                        : ""
                    }`}
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + `/images/red-arrow.png`}
                      alt="arrow"
                    />
                  </button>
                  <p>следующий вопрос</p>
                </div>
              )}
            </div>
            <div className="line">
              <hr />
            </div>
            <div className="question-number">
              <div className="buttons">
                {!adminMode ? (
                  questionCounter !== 0 ? (
                    <>
                      <span>{questionCounter}</span> вопрос
                    </>
                  ) : (
                    "Начало игры"
                  )
                ) : (
                  <span>{question[0].id}</span>
                )}
                {adminMode && (
                  <>
                    <button
                      className="edit-question"
                      onClick={() => {
                        setCurrentQuestionID(question[0]._id);
                        setShowModalQuestion(true);
                      }}
                    >
                      <div className="">Редактировать вопрос</div>
                      <EditIcon />
                    </button>
                    <button
                      className="add-question"
                      onClick={() => {
                        setShowModalQuestion(true);
                      }}
                    >
                      <div className=""> Добавить вопрос</div>
                      <AddIcon />
                    </button>
                    <button
                      className="delete-question"
                      onClick={() => {
                        setIdForDelete(question[0]._id);
                        setAlertDeleteQuestion(true);
                      }}
                    >
                      <div>Удалить вопрос</div>
                      <DeleteIcon />
                    </button>
                    <button
                      className="view-questions-map"
                      onClick={() => setShowQuestionMap(!showQuestionMap)}
                    >
                      <div>Карта вопросов</div>
                      <MapIcon />
                    </button>
                    <button
                      className="exit-editing"
                      onClick={() => setAdminMode(false)}
                    >
                      <div>Завершить редактирование</div>
                      <ExitIcon />
                    </button>
                  </>
                )}
              </div>
            </div>
            {"isChooseSex" in question[0] && (
              <CSSTransition in={show} timeout={5000} classNames="alert">
                <>
                  <ChooseSex
                    question={question}
                    isLoading={isLoading}
                    setImgLoaded={setImgLoaded}
                    nextClick={nextClick}
                    imgLoaded={imgLoaded}
                  />
                </>
              </CSSTransition>
            )}
            {isLoading && (
              <div
                style={{
                  alignSelf: "center",
                  justifySelf: "center",
                  textAlign: "center",
                }}
              >
                <Loading loading={isLoading} />
              </div>
            )}

            <CSSTransition in={show} timeout={300} classNames="alert">
              <div
                className={`${
                  !("isChooseSex" in question[0]) ? "main" : "hidden"
                }${question[0].options.length > 1 ? " main-multiple" : ""}${
                  question[0].options.length === 2 ? " main-small-options" : ""
                }`}
              >
                <>
                  <div className="question">
                    {!isLoading && !("isChooseSex" in question[0]) && (
                      <Question
                        question={question}
                        nextClick={nextClick}
                        setCurrentInfoDisplayed={setCurrentInfoDisplayed}
                        currentInfoDisplayed={currentInfoDisplayed}
                        setIsShowInfo={setIsShowInfo}
                        isLoading={isLoading}
                        setImgLoaded={setImgLoaded}
                        lose={lose}
                        adminMode={adminMode}
                        dispatch={dispatch}
                        isShowInfo={isShowInfo}
                      />
                    )}
                  </div>

                  {!("isChooseSex" in question[0]) && (
                    <div
                      className={`image${
                        question[0].options.length === 1 ? " image-down" : ""
                      }`}
                    >
                      <Image
                        question={question}
                        setImgLoaded={setImgLoaded}
                        isLoading={isLoading}
                        imgLoaded={imgLoaded}
                        adminMode={adminMode}
                      />
                    </div>
                  )}
                </>
              </div>
            </CSSTransition>
          </div>
        )}
      </>
      {alertDeleteQuestion && (
        <div className="alert-delete-modal">
          <div className="alert-delete-modal-content">
            <p>
              Вы уверены, что хотите удалить вопрос?
              <div className="buttons">
                <button
                  onClick={() => {
                    notifyAboutDelete();
                    dispatch(deleteQuestion(idForDelete));
                    setIdForDelete(null);
                    setAlertDeleteQuestion(false);
                  }}
                >
                  Да
                </button>
                <button
                  onClick={() => {
                    setAlertDeleteQuestion(false);
                  }}
                >
                  Нет
                </button>
              </div>
            </p>
          </div>
        </div>
      )}

      {showQuestionMap && (
        <QuestionMap
          questions={questions}
          setCurrentQuestionID={setCurrentQuestionID}
          setShowModalQuestion={setShowModalQuestion}
          setAlertDeleteQuestion={setAlertDeleteQuestion}
          setShowQuestionMap={setShowQuestionMap}
          questionInitialState={questionInitialState}
          setQuestionInitialState={setQuestionInitialState}
          alertDeleteQuestion={alertDeleteQuestion}
          dispatch={dispatch}
          deleteQuestion={deleteQuestion}
          setQuestion={setQuestion}
          setIndex={setIndex}
          question={question}
        />
      )}
      {showModalQuestion && (
        <EditQuestion
          dispatch={dispatch}
          questionToUpdate={questionToUpdate}
          setQuestion={setQuestion}
          showModalQuestion={showModalQuestion}
          questions={questions}
          alertDeleteQuestion={alertDeleteQuestion}
          setIdForDelete={setIdForDelete}
          setAlertDeleteQuestion={setAlertDeleteQuestion}
          idForDelete={idForDelete}
          initialState={initialState}
          setShowModalQuestion={setShowModalQuestion}
          setCurrentQuestionID={setCurrentQuestionID}
          currentQuestionID={currentQuestionID}
          questionInitialState={questionInitialState}
          setQuestionInitialState={setQuestionInitialState}
          setIndex={setIndex}
          question={question}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Gameplay;
