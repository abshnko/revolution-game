import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import data from "./data";
import Question from "./components/Question";
import { FaSpinner } from "react-icons/fa";
import CurrentInfo from "./components/CurrentInfo";
import InfoColumn from "./components/InfoColumn";

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

  const addInfoHelper = (singleInfo, infoAdded) => {
    const i = INFOS.findIndex(
      (infoObj) => infoObj.period === question[0].period
    );
    console.log("index in INFOS:", i);
    if (i !== -1 && !infoAdded) {
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

  const addINFO = () => {
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
  };

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
      if (index !== question[0].id) {
        setQuestionCounter(questionCounter + 1);
        setQuestionChanged(true);
        setQuestion(data.filter((item) => item.id === index));
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

  const nextClick = (id, isActive, next, nextJump, jumpFromHere) => {
    if (nextJump !== 0) {
      setJump(nextJump);
    }
    if (jumpFromHere) setIsJump(true); //вытащить if jumpFromHere === true then set
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
      } else if ("jumpFromHere" in question[0].options[0]) {
        setIsJump(true);
        setIndex(question[0].options[0].next);
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
                  <InfoColumn
                    period={period}
                    setIsShowInfoEntries={setIsShowInfoEntries}
                    chooseDisplayedInfo={chooseDisplayedInfo}
                  />
                );
              })}
            </div>
            {isShowInfo && ( //show currently chosen info entry
              <CurrentInfo
                question={question}
                setIsShowInfo={setIsShowInfo}
                INFOS={INFOS}
                currentInfoDisplayed={currentInfoDisplayed}
              />
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
                  <Question question={question} nextClick={nextClick} />
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
