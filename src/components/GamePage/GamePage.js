import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../styles/main/style.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Fade, Transform } from "react-animation-components";
import periods from "../../periods";
import Question from "./Question";
import Image from "./Image";
import CurrentInfo from "./CurrentInfo";
import Loading from "./Loading";
import ChooseSex from "./ChooseSex";
import LoseScreen from "./LoseScreen";
import Timeline from "./Timeline";
import Rules from "./Rules";

function GamePage({ questions }) {
  const [index, setIndex] = useState(1000);
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState(() => {
    const saved = localStorage.getItem("question");
    const initialValue = JSON.parse(saved);
    return initialValue || questions;
  });
  const [isShowRules, setIsShowRules] = useState(true);
  const [questionChanged, setQuestionChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  function useForceUpdate() {
    const [state, setState] = useState(0);
    return () => setState((state) => state + 1);
  }

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
      isActive: false,
    };
    var infosArray = INFOS[i].infos;
    infosArray.push(newINFO);
    const newObj = { ...INFOS[i], infos: infosArray, isShowEntries: true };
    const newArray = INFOS;
    newArray[i] = newObj;
    setINFOS(newArray);
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
          setQuestionCounter(questionCounter + 1);
          setQuestionChanged(true);
          setQuestionChanged(false);
        }, 100);
        // return clearTimeout(time);
      }
    }
  };

  useEffect(() => {
    checkOptions();
    // setShow(true);
    console.log(question[0]);
    console.log("NEXT JUMP: ", jump);
  }, [question]);

  useEffect(() => {
    addINFO();
    // setShowQuestionSatus();
    if (question[0].img === "") {
      setImgLoaded(true);
    }
    if ("lose" in question[0]) {
      setLose(true);
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

  //   const setShowQuestionSatus = () => {
  //     if (!isLoading) {
  //       setIsShowQuestion(true);
  //     } else {
  //       setIsShowQuestion(false);
  //     }
  //     setIsLoading(true);
  //   };

  return (
    <>
      <Router>
        <div className="game-page">
          {isShowRules && <Rules setIsShowRules={setIsShowRules} />}
          {!isShowRules && (
            <div className="wrapper">
              {questionChanged && <h1>Loading...</h1>}
              <>
                <div className="container">
                  <div className="timeline">
                    <Timeline
                      latestPeriod={question[0].period}
                      questionCounter={questionCounter}
                    />
                  </div>
                  {isShowInfo && ( //show currently chosen info entry
                    <CurrentInfo
                      question={question}
                      setIsShowInfo={setIsShowInfo}
                      INFOS={INFOS}
                      currentInfoDisplayed={currentInfoDisplayed}
                    />
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
                      <p>Человек в эпоху войн и революций</p>
                    </div>
                    {!lose && (
                      <div className="next">
                        <button
                          className="next-button"
                          onClick={() => {
                            handleClick();
                            // forceUpdate();
                          }}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL + `/images/red-arrow.png`
                            }
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
                    {questionCounter !== 0 ? (
                      <>
                        <span>{questionCounter}</span> вопрос
                      </>
                    ) : (
                      "Начало игры"
                    )}
                  </div>
                  {"isChooseSex" in question[0] && (
                    <CSSTransition
                      in={show}
                      timeout={5000}
                      classNames="alert"
                      //   unmountOnExit
                    >
                      <>
                        {/* <Fade
                        in
                        enterOpacity={1}
                        exitOpacity={0}
                        delay={0}
                        duration={500}
                      > */}
                        <ChooseSex
                          question={question}
                          isLoading={isLoading}
                          setImgLoaded={setImgLoaded}
                          nextClick={nextClick}
                          imgLoaded={imgLoaded}
                        />
                        {/* </Fade> */}
                      </>
                    </CSSTransition>
                  )}
                  {/* <TransitionGroup component={null}> */}
                  <CSSTransition in={show} timeout={300} classNames="alert">
                    <div
                      className={`${
                        !("isChooseSex" in question[0]) ? "main" : "hidden"
                      }${
                        question[0].options.length > 1 ? " main-multiple" : ""
                      }`}
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
                            />
                          )}
                        </div>

                        {!("isChooseSex" in question[0]) && (
                          <div
                            className={`image${
                              question[0].options.length === 1
                                ? " image-down"
                                : ""
                            }`}
                          >
                            <Image
                              question={question}
                              setImgLoaded={setImgLoaded}
                              isLoading={isLoading}
                              imgLoaded={imgLoaded}
                            />
                          </div>
                        )}
                      </>
                    </div>
                  </CSSTransition>
                  {/* </TransitionGroup> */}

                  {/* )} */}

                  {/* {!isShowInfo && (
                    <div className="controls" id={question[0].id}>
                    {isLoading && <Loading />}
                    {!isLoading && (
                        <div className="year">{question[0].year}</div>
                        )}
                        <div className="main">
                        <Image
                        question={question}
                        setImgLoaded={setImgLoaded}
                        isLoading={isLoading}
                        />
                        {!isLoading && (
                            <Question
                            question={question}
                            nextClick={nextClick}
                            chooseDisplayedInfo={chooseDisplayedInfo}
                            />
                            )}
                            {question[0].lose ? <LoseScreen grade={grade} /> : null}
                            </div>
                            </div>
                        )} */}

                  {/* {lose && <LoseScreen />} */}
                </div>
              </>
            </div>
          )}
        </div>
      </Router>
    </>
  );
}

export default GamePage;
