import React, { useReducer } from "react";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../../styles/main/style.css";
import periods from "../../periods";
import Question from "./Question";
import Image from "./Image";
import CurrentInfo from "./CurrentInfo";
import InfoColumn from "./InfoColumn";
import Loading from "./Loading";
import { INFOSReducer } from "../../reducer";
import LoseScreen from "./LoseScreen";
import { BsArrowRight } from "react-icons/bs";
import InfoModal from "./InfoModal";

function GamePage({ questions }) {
  const [index, setIndex] = useState(1000);
  const [question, setQuestion] = useState(questions);
  const [questionChanged, setQuestionChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [INFOS, setINFOS] = useState(periods);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [isJump, setIsJump] = useState(false);
  const [jump, setJump] = useState(0);
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentInfoDisplayed, setCurrentInfoDisplayed] = useState();
  const [lose, setLose] = useState(false);
  const [grade, setGrade] = useState(3);

  const addInfoHelper = (singleInfo) => {
    const i = INFOS.findIndex(
      (infoObj) => infoObj.period === question[0].period
    );
    // console.log("index in INFOS:", i);
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

    // console.log(INFOS, "added into existed obj");
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

  const setIsShowInfoEntries = (periodId) => {
    const i = INFOS.findIndex((period) => period.id === periodId);
    const newArray = [...INFOS];
    const cloneObj = newArray[i];
    const show = cloneObj.isShowEntries;
    const newObj = { ...cloneObj, isShowEntries: !show };
    newArray[i] = newObj;
    setINFOS(newArray);
    INFOS.forEach((INFO) => {
      INFO.isShowEntries = false;
    });
  };

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
  }, [questionCounter]);

  useEffect(() => {
    const time = setTimeout(() => {
      if (imgLoaded) {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(time);
  }, [imgLoaded]);

  //   useEffect(() => {
  //     console.log("array changed, new length:", INFOS.length);
  //   }, [INFOS]);

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
    console.log("IN");
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
    console.log("OUT");
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
      // ADD if length === 0 : endgame (maybe)
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

            {/* CARD */}
            <>
              <div className="container">
                {/* <div className="info-entries"> */}
                {/*whole left column*/}
                {/* {INFOS.map((period) => {
                    return (
                      <InfoColumn
                        period={period}
                        setIsShowInfoEntries={setIsShowInfoEntries}
                        chooseDisplayedInfo={chooseDisplayedInfo}
                      />
                    );
                  })} */}
                {/* </div> */}
                {/* {isShowInfo} */}
                <div className="timeline"></div>
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
                      const localInfos = [];
                      var id = 0;
                      if ("infos" in option) {
                        option.infos.forEach((info) => {
                          id = info.id;
                          localInfos.push(info.name);
                        });
                        return (
                          <div
                            className="info"
                            onClick={() => chooseDisplayedInfo(id)}
                          >
                            {localInfos}
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                  <div className="year">
                    {question[0].year}
                    <p>название игры</p>
                  </div>
                  {!lose && (
                    <div className="next">
                      <button
                        className="next-button"
                        onClick={() => handleClick()}
                      >
                        <svg
                          width="122"
                          height="59"
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
                <div className="question-number">№ {questionCounter}</div>
                <div className="main">
                  {/* {!isShowInfo && ( */}
                  <>
                    <div className="question">
                      {isLoading && <Loading />}
                      {!isLoading && (
                        <Question
                          question={question}
                          nextClick={nextClick}
                          chooseDisplayedInfo={chooseDisplayedInfo}
                        />
                      )}
                    </div>

                    <div className="image">
                      <Image
                        question={question}
                        setImgLoaded={setImgLoaded}
                        isLoading={isLoading}
                      />
                    </div>
                  </>
                  {/* )} */}
                </div>

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

                {/* {lose && <LoseScreen grade={grade} />} */}
                {/* {!lose && (
                  <div className="next">
                    <div className="question-number">{questionCounter}</div>
                    <button
                      className="next-button"
                      onClick={() => handleClick()}
                    >
                      <BsArrowRight />
                    </button>
                  </div>
                )} */}
              </div>
            </>
          </div>
        </div>
      </Router>
    </>
  );
}

export default GamePage;
