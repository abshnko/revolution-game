import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../styles/main/style.css";
import periods from "../../periods";
import Question from "./Question";
import Image from "./Image";
import CurrentInfo from "./CurrentInfo";
import Loading from "./Loading";
import ChooseSex from "./ChooseSex";
import LoseScreen from "./LoseScreen";
import Timeline from "./Timeline";

function GamePage({ questions }) {
  const [index, setIndex] = useState(1000);
  const [question, setQuestion] = useState(() => {
    const saved = localStorage.getItem("question");
    const initialValue = JSON.parse(saved);
    return initialValue || questions;
  });
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
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentInfoDisplayed, setCurrentInfoDisplayed] = useState();
  const [lose, setLose] = useState(false);

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

  //   const setIsShowInfoEntries = (periodId) => {
  //     const i = INFOS.findIndex((period) => period.id === periodId);
  //     const newArray = [...INFOS];
  //     const cloneObj = newArray[i];
  //     const show = cloneObj.isShowEntries;
  //     const newObj = { ...cloneObj, isShowEntries: !show };
  //     newArray[i] = newObj;
  //     setINFOS(newArray);
  //     INFOS.forEach((INFO) => {
  //       INFO.isShowEntries = false;
  //     });
  //   };

  const handleClick = () => {
    if (!isShowInfo) {
      if (index !== question[0].id) {
        setQuestionCounter(questionCounter + 1);
        setQuestionChanged(true);
        setQuestion(questions.filter((item) => item.id === index));
        setQuestionChanged(false);
        setIsLoading(true);
        setImgLoaded(false);
      }
    }
  };

  useEffect(() => {
    checkOptions();
  }, [question]);

  useEffect(() => {
    addINFO();
    setShowQuestionSatus();
    if (question[0].img === "") {
      setImgLoaded(true);
    }
    if ("lose" in question[0]) {
      setLose(true);
    }
    localStorage.setItem("question", JSON.stringify(question));
    localStorage.setItem("question-number", JSON.stringify(questionCounter));
  }, [questionCounter]);

  useEffect(() => {
    if ("isChooseSex" in question[0]) {
    }
    const time = setTimeout(() => {
      if (imgLoaded) {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(time);
  }, [imgLoaded]);

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

  const setShowQuestionSatus = () => {
    if (!isLoading) {
      setIsShowQuestion(true);
    } else {
      setIsShowQuestion(false);
    }
    setIsLoading(true);
  };

  return (
    <>
      <Router>
        <div className="game-page">
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
                  <div className="infos">
                    {"infos" in question[0]
                      ? question[0].infos.map((info) => {
                          return (
                            <div
                              className="info"
                              onClick={() => chooseDisplayedInfo(info.id)} //FIX
                            >
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
                        onClick={() => handleClick()}
                      >
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 122 59"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.83008 30.1592H119.439M119.439 30.1592L74.2935 56M119.439 30.1592L74.2935 3"
                            stroke="white"
                            stroke-width="5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                      <p>следующий вопрос</p>
                    </div>
                  )}
                </div>
                <div className="line">
                  <hr />
                </div>
                <div className="question-number">
                  {questionCounter !== 0
                    ? `№${questionCounter}`
                    : "Начало игры"}
                </div>
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
                        />
                      </div>
                    )}
                  </>
                </div>
                {"isChooseSex" in question[0] && (
                  <ChooseSex
                    question={question}
                    isLoading={isLoading}
                    setImgLoaded={setImgLoaded}
                    nextClick={nextClick}
                    imgLoaded={imgLoaded}
                  />
                )}

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
        </div>
      </Router>
    </>
  );
}

export default GamePage;
