import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
// import Question from "./Question";
import data from "./data";
import Question from "./Question";
import { BsQuestion } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import placeholder from "./images/placeholder.png";
import { FaSpinner } from "react-icons/fa";

function App() {
  const [index, setIndex] = useState(1000);
  const [question, setQuestion] = useState(data);
  const [questionChanged, setQuestionChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [testCounter, setTestCounter] = useState(1); //helps rerender infos for some reason
  const [isJump, setIsJump] = useState(false);
  const [jump, setJump] = useState(0);
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [INFOS, setINFOS] = useState([]);
  const [currentInfoDisplayed, setCurrentInfoDisplayed] = useState();
  // console.log(typeof infoArray);
  // info object:
  // {title, text, img, isActive}

  const addInfoHelper = (singleInfo) => {
    const i = INFOS.findIndex(
      (infoObj) => infoObj.period === question[0].period
    );
    console.log("index in INFOS:", i);
    if (i !== -1) {
      const newINFO = {
        infoId: singleInfo.id,
        infoName: singleInfo.name,
        infoText: singleInfo.text,
        isActive: false,
      };
      var infosArray = INFOS[i].infos;
      infosArray.push(newINFO);
      const newObj = { ...INFOS[i], infos: infosArray };
      const newArray = INFOS;
      newArray[i] = newObj;
      setINFOS(newArray);
    } else {
      const newINFO = {
        infoId: singleInfo.id,
        infoName: singleInfo.name,
        infoText: singleInfo.text,
        isActive: false,
      };
      setINFOS((INFOS) => [
        ...INFOS,
        {
          id: INFOS.length + 1,
          period: question[0].period,
          infos: [newINFO],
          isShowEntries: true,
        },
      ]);

      INFOS.map((INFO) => {
        INFO.isShowEntries = false;
      });
    }
  };

  function addINFO() {
    if ("infos" in question[0]) {
      question[0].infos.map((singleInfo) => {
        addInfoHelper(singleInfo);
      });
    }
    question[0].options.map((option) => {
      if ("infos" in option) {
        option.infos.map((singleInfo) => {
          addInfoHelper(singleInfo);
        });
      }
    });
  }

  const setIsShowInfoEntries = (periodId) => {
    const i = INFOS.findIndex((period) => period.id === periodId);
    const newArray = [...INFOS];
    const cloneObj = newArray[i];
    const show = cloneObj.isShowEntries;
    const newObj = { ...cloneObj, isShowEntries: !show };
    newArray[i] = newObj;
    setINFOS(newArray);
    INFOS.map((INFO) => {
      INFO.isShowEntries = false;
    });
  };

  const handleClick = () => {
    if (!isShowInfo) {
      if (index !== question[0].id) setQuestionCounter(questionCounter + 1);
      setQuestionChanged(true);
      setQuestion(data.filter((item) => item.id === index));
      setQuestionChanged(false);
      setIsLoading(true);
      setImgLoaded(false);
    }
  };

  useEffect(() => {
    checkOptions();
  }, [question]);

  useEffect(() => {
    checkInfos();
    addINFO();
    setShowQuestionSatus();
    if (question[0].img === "") {
      setImgLoaded(true);
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

  useEffect(() => {
    console.log("array changed, new length:", INFOS.length);
  }, [INFOS]);

  const nextClick = (id, isActive, next, nextJump) => {
    if (nextJump !== 0) {
      setJump(nextJump);
      setIsJump(true);
    }
    setIndex(next);

    //change active option
    const i = question[0].options.findIndex((option) => option.id === id);
    const clone = [...question[0].options];
    clone[i] = { ...clone[i], isActive: true };
    const objClone = [...question];
    objClone[0] = { ...question[0], options: clone };
    setQuestion(objClone);
    question[0].options.map((option) => {
      option.isActive = false;
    });
  };

  const chooseDisplayedInfo = (infoId) => {
    //check active info

    INFOS.map((INFO, INFOindex) => {
      const i = INFO.infos.findIndex((info) => info.infoId === infoId);
      if (i !== -1) {
        INFO.infos.map((info, infoIndex) => {
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
          console.log("info is active?", info.isActive);
        });
      }
      INFO.infos.map((info, infoIndex) => {
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
      } else {
        setIndex(question[0].options[0].next);
      }
      // ADD if length === 0 : endgame (maybe)
    }
  };

  //helps rerendering infos for some reason
  const checkInfos = () => {
    setTestCounter(testCounter + 1);
    console.log(INFOS);
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
      <div className="wrapper">
        {questionChanged && <h1>Loading...</h1>}

        {/* CARD */}
        <>
          <div className="container">
            <div className="info-entries">
              {" "}
              {/*whole left column*/}
              {INFOS.map((period) => {
                return (
                  <div className="single-period">
                    <button
                      className="period-btn"
                      onClick={() => setIsShowInfoEntries(period.id)}
                    >
                      {period.period}
                    </button>
                    {period.isShowEntries &&
                      period.infos.map((info) => {
                        return (
                          <>
                            <div className="info-single-entry">
                              <button
                                onClick={() => chooseDisplayedInfo(info.infoId)}
                                className={`info-btn ${
                                  info.isActive ? "active-entry" : ""
                                }`}
                              >
                                {info.infoName}
                              </button>
                            </div>
                          </>
                        );
                      })}
                  </div>
                );
              })}
            </div>
            {isShowInfo && ( //show currently chosen info entry
              <div className="card" id={question[0].id}>
                <div className="close-info">
                  <button
                    onClick={() => {
                      setIsShowInfo(false);
                      INFOS.map((INFO) => {
                        INFO.infos.map((info, infoIndex) => {
                          info.isActive = false;
                        });
                      });
                    }}
                  >
                    <i>
                      <AiOutlineClose />
                    </i>
                  </button>
                </div>
                <div className="infoName">
                  <h2>{currentInfoDisplayed.infoName}</h2>
                </div>
                {/* <div className="img-container">
                  <img className="headImage" src={placeholder} alt="img here" />
                </div> */}

                <div className="info-text">
                  <p>{currentInfoDisplayed.infoText}</p>
                </div>
              </div>
            )}
            {!isShowInfo && (
              <div className="card" id={question[0].id}>
                {isLoading && (
                  <div className="spinner">
                    <i>
                      <FaSpinner />
                    </i>
                  </div>
                )}
                {!isLoading && <div className="year">{question[0].year}</div>}
                <div className="img-container">
                  {question[0].img !== "" ? (
                    <img
                      className="headImage"
                      src={
                        process.env.PUBLIC_URL + `/images/${question[0].img}`
                      }
                      style={!isLoading ? {} : { display: "none" }}
                      alt="img here"
                      onLoad={() => setImgLoaded(true)}
                    />
                  ) : null}
                </div>
                {!isLoading && (
                  <>
                    <div className="img-ref">
                      <a href={question[0].imgRef}>источник</a>
                    </div>
                    <div className="id-testing">current: {question[0].id}</div>
                    <div className="question">
                      <h2>{question[0].text}</h2>
                    </div>
                    {question[0].options.length > 1 && (
                      <div className="options">
                        <div className="option-container">
                          {question[0].options.map((option) => {
                            if ("nextJump" in option) {
                              const nextJump = option.nextJump;
                              const next = option.next;
                              return (
                                <>
                                  {/*testing*/}
                                  <div className="next-option-testing">
                                    nextJump: {option.nextJump}
                                  </div>
                                  <button
                                    className={`option ${
                                      option.isActive ? "active" : ""
                                    }`}
                                    key={option.id}
                                    onClick={() =>
                                      nextClick(
                                        option.id,
                                        option.isActive,
                                        next,
                                        nextJump
                                      )
                                    }
                                  >
                                    {option.text}
                                  </button>
                                </>
                              );
                            } else {
                              const next = option.next;
                              return (
                                <>
                                  {/*testing*/}
                                  <div className="next-option-testing">
                                    next: {option.next}
                                  </div>
                                  <button
                                    className={`option ${
                                      option.isActive ? "active" : ""
                                    }`}
                                    key={option.id}
                                    onClick={() =>
                                      nextClick(
                                        option.id,
                                        option.isActive,
                                        next,
                                        0
                                      )
                                    }
                                  >
                                    {option.text}
                                  </button>
                                </>
                              );
                            }
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            <div className="next">
              <div className="question-number">{questionCounter}</div>
              <button className="next-button" onClick={() => handleClick()}>
                Далее
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default App;
