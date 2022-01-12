import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../styles/main/style.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AiFillEdit } from "react-icons/ai";
import { Fade, Transform } from "react-animation-components";
import periods from "../../periods";
import Question from "./Question";
import Image from "./Image";
import CurrentInfo from "./CurrentInfo";
import Loading from "./Loading";
import ChooseSex from "./ChooseSex";
import LoseScreen from "./LoseScreen";
import Timeline from "./Timeline";
import EditQuestion from "./Editing/EditQuestion";
import QuestionMap from "./Editing/QuestionMap";

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
}) => {
  const [index, setIndex] = useState(1000);
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [question, setQuestion] = useState(() => {
    const saved = localStorage.getItem("question");
    const initialValue = JSON.parse(saved);
    if (initialValue !== null) {
      return initialValue;
    } else if (questions.length !== 0) {
      return questions;
    } else return [];
  });
  //   const [questionState, setquestionState] = useState(question[0]);
  console.log(questions);
  const [questionChanged, setQuestionChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [indexChanged, setIndexChanged] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [INFOS, setINFOS] = useState(periods);
  const [questionCounter, setQuestionCounter] = useState(() => {
    const counter = parseInt(localStorage.getItem("question-number"));
    return counter || 0;
  });

  const [isJump, setIsJump] = useState(false);
  const [jump, setJump] = useState(0);
  //   const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentInfoDisplayed, setCurrentInfoDisplayed] = useState();
  const [lose, setLose] = useState(false);
  const forceUpdate = useForceUpdate();
  const [showQuestionMap, setShowQuestionMap] = useState(false);

  function useForceUpdate() {
    const [state, setState] = useState(0);
    return () => setState((state) => state + 1);
  }

  //Проверить что случается при внесении изменений в БД!!!!
  useEffect(() => {
    setQuestion(questions);
    console.log("DB QUESTIONS CHANGED");
  }, [questions]);

  const addInfoHelper = (singleInfo) => {
    const i = INFOS.findIndex(
      (infoObj) => infoObj.period === question[0].period
    );
    INFOS.forEach((INFO) => {
      INFO.isShowEntries = false;
    });
    const newINFO = {
      infoId: singleInfo.id,
      infoName: singleInfo.name,
      infoText: singleInfo.text,
      infoImg: singleInfo.img,
      isActive: false,
    };
    if (i !== -1) {
      var infosArray = INFOS[i].infos;
    }
    infosArray.push(newINFO);
    const newObj = { ...INFOS[i], infos: infosArray, isShowEntries: true };
    const newArray = INFOS;
    newArray[i] = newObj;
    setINFOS(newArray);
    console.log(INFOS);
  };

  const addINFO = () => {
    if ("infos" in question[0]) {
      question[0].infos.forEach((singleInfo) => {
        addInfoHelper(singleInfo);
      });
    }
    question[0].options.forEach((option) => {
      if ("infos" in option) {
        option.infos.forEach((singleInfo) => {
          addInfoHelper(singleInfo);
        });
      }
    });
  };

  const handleClick = () => {
    if (!isShowInfo) {
      if (index !== question[0].id) {
        setShow(false);
        const time = setTimeout(() => {
          setImgLoaded(false);
          setIsLoading(true);
          setQuestion(questions.filter((item) => item.id === index));
          //   setquestionState(questions.filter((item) => item.id === index)); /////GET RID OF IT LATER
          setQuestionCounter(questionCounter + 1);
          setQuestionChanged(true);
          setQuestionChanged(false);
          setIndexChanged(false);
        }, 100);
        // return clearTimeout(time);
      }
    }
  };

  useEffect(() => {
    if (questions.length !== 0) {
      checkOptions();
    }
    // setShow(true);
    console.log(question[0]);
    console.log("NEXT JUMP: ", jump);
    forceUpdate();
  }, [question]);

  useEffect(() => {
    if (questions.length !== 0) {
      addINFO();
      // setShowQuestionSatus();
      if (question[0].img === "") {
        setImgLoaded(true);
      }
      if ("lose" in question[0]) {
        setLose(true);
      }
    }

    // localStorage.setItem("question", JSON.stringify(question));
    // localStorage.setItem("question-number", JSON.stringify(questionCounter));
  }, [questionCounter]);

  useEffect(() => {
    const time = setTimeout(() => {
      if (imgLoaded) {
        setIsLoading(false);
        // setShow(true);
      }
    }, 100);
    return () => clearTimeout(time);
  }, [imgLoaded]);

  useEffect(() => {
    console.log("isLOADING: ", isLoading);
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

  const chooseDisplayedInfo = (infoId) => {
    //check active info
    INFOS.forEach((INFO, INFOindex) => {
      const i = INFO.infos.findIndex((info) => info.infoId === infoId);
      if (i !== -1) {
        INFO.infos.forEach((info, infoIndex) => {
          const arrayInfos = [...INFO.infos];
          arrayInfos[i] = { ...arrayInfos[i], isActive: true };
          setCurrentInfoDisplayed(arrayInfos[i]);
          setIsShowInfo(true);
          const INFOArrCLone = [...INFOS];
          INFOArrCLone[INFOindex] = {
            ...INFOArrCLone[INFOindex],
            infos: arrayInfos,
          };
          setINFOS(INFOArrCLone);
        });
      }
      INFO.infos.forEach((info) => {
        info.isActive = false;
      });
    });
    console.log("CURRENT INFO: ", currentInfoDisplayed);
  };

  //check if there's more than one option = it's a question, otherwise =it's an announcement
  const checkOptions = () => {
    if (question[0].options.length === 1) {
      if (isJump) {
        setIndex(jump);
        console.log(jump);
        setIsJump(false);
      } else if ("jumpFromHere" in question[0].options[0]) {
        setIsJump(true);
        setIndex(question[0].options[0].next);
      } else {
        setIndex(question[0].options[0].next);
      }
    }
  };

  return (
    <div className="wrapper">
      <>
        {question.length === 0 ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="timeline">
              <Timeline
                latestPeriod={question[0].period}
                questionCounter={questionCounter}
              />
            </div>
            {isShowInfo && ( //show currently chosen info entry
              <CSSTransition in={isShowInfo} timeout={300} classNames="alert">
                <CurrentInfo
                  question={question}
                  setIsShowInfo={setIsShowInfo}
                  INFOS={INFOS}
                  currentInfoDisplayed={currentInfoDisplayed}
                  //   questionState={questionState}
                />
              </CSSTransition>
            )}
            <div className="controls">
              {/*refactor */}
              <div className="infos">
                {"infos" in question[0]
                  ? question[0].infos.map((info) => {
                      return (
                        <div
                          className="info"
                          onClick={() => chooseDisplayedInfo(info.id)}
                        >
                          <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.3247 4.90503L0.0747066 9.66817L0.074707 0.141889L11.3247 4.90503Z"
                              fill="black"
                            />
                          </svg>
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
                          onClick={() => chooseDisplayedInfo(info.id)}
                        >
                          <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.3247 4.90503L0.0747066 9.66817L0.074707 0.141889L11.3247 4.90503Z"
                              fill="black"
                            />
                          </svg>
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
              {/* <button
                      onClick={() => setShow(!show)}
                    >{`SHOW: ${show}`}</button>
                    <p>{`imgLoaded: ${imgLoaded}, isLoading: ${isLoading}`}</p> */}
            </div>
            <div className="question-number">
              <div className="buttons">
                {questionCounter !== 0 ? (
                  <>
                    <span>{questionCounter}</span> вопрос
                  </>
                ) : (
                  "Начало игры"
                )}
                {adminMode && (
                  <>
                    <button
                      className="edit-question"
                      onClick={() => {
                        // if (questionInitialState.id === 0) {
                        //   let temp = 1000;
                        //   if (questions.length > 0) {
                        //     questions.forEach((x) => {
                        //       if (x.id > temp) {
                        //         temp = x.id;
                        //       }
                        //     });
                        //   }
                        //   setQuestionInitialState({
                        //     ...questionInitialState,
                        //     id: temp + 1,
                        //   });
                        // }
                        setCurrentQuestionID(question[0]._id);
                        setShowModalQuestion(true);
                      }}
                    >
                      <div className="">Редактировать вопрос</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-edit"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#d4d4d4"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"></path>
                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"></path>
                        <line x1="16" y1="5" x2="19" y2="8"></line>
                      </svg>
                    </button>
                    <button className="add-question">
                      <div className=""> Добавить вопрос</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-plus"
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        stroke-width="3"
                        stroke="#d4d4d4"
                        fill="#d4d4d4"
                        // stroke-linecap="round"
                        // stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    <button className="delete-question">
                      <div>Удалить вопрос</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-trash"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#d4d4d4"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <line x1="4" y1="7" x2="20" y2="7"></line>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                      </svg>
                    </button>
                    <button
                      className="view-questions-map"
                      onClick={() => setShowQuestionMap(!showQuestionMap)}
                    >
                      <div>Карта вопросов</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-compass"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#d4d4d4"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <polyline points="8 16 10 10 16 8 14 14 8 16"></polyline>
                        <circle cx="12" cy="12" r="9"></circle>
                        <line x1="12" y1="3" x2="12" y2="5"></line>
                        <line x1="12" y1="19" x2="12" y2="21"></line>
                        <line x1="3" y1="12" x2="5" y2="12"></line>
                        <line x1="19" y1="12" x2="21" y2="12"></line>
                      </svg>
                    </button>
                    <button
                      className="exit-editing"
                      onClick={() => setAdminMode(false)}
                    >
                      <div>Завершить редактирование</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-logout"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="#d4d4d4"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                      </svg>
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
            <CSSTransition in={show} timeout={300} classNames="alert">
              <div
                className={`${
                  !("isChooseSex" in question[0]) ? "main" : "hidden"
                }${question[0].options.length > 1 ? " main-multiple" : ""}`}
              >
                <>
                  <div className="question">
                    {isLoading && <Loading />}
                    {!isLoading && !("isChooseSex" in question[0]) && (
                      <Question
                        question={question}
                        nextClick={nextClick}
                        chooseDisplayedInfo={chooseDisplayedInfo}
                        isLoading={isLoading}
                        setImgLoaded={setImgLoaded}
                        lose={lose}
                        adminMode={adminMode}
                        dispatch={dispatch}
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
      {showQuestionMap && (
        <QuestionMap
          questions={questions}
          questionInitialState={questionInitialState}
          setQuestionInitialState={setQuestionInitialState}
          imgLoaded={imgLoaded}
          setImgLoaded={setImgLoaded}
          setCurrentQuestionID={setCurrentQuestionID}
          setShowModalQuestion={setShowModalQuestion}
          setIdForDelete={setIdForDelete}
          setAlertDeleteQuestion={setAlertDeleteQuestion}
          setShowQuestionMap={setShowQuestionMap}
        />
      )}
      {showModalQuestion && (
        <EditQuestion
          dispatch={dispatch}
          questionToUpdate={questionToUpdate}
          setQuestion={setQuestion}
          //   question={question}
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
        />
      )}
    </div>
  );
};

export default Gameplay;
