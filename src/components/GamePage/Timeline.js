import React, { useState } from "react";
import { Chrono } from "react-chrono";
import { useEffect } from "react";
import circle from "../../images/circle-24.png";
import current from "../../images/current.png";
import ReactDOMServer from "react-dom/server";

const Timeline = ({
  latestPeriod,
  allPeriods,
  setAllPeriods,
  questionCounter,
}) => {
  const [counter, setCounter] = useState(1);
  const checkIfPeriodExists = () => {
    for (var i = 0; i < allPeriods.length; i++) {
      //   const parts = latestPeriod.split("-");
      //   const newP = (
      //     <p>
      //       {parts[0]}-<span>{parts[1]}</span>
      //     </p>
      //   );
      //   console.log(newP);
      //   const ss = ReactDOMServer.renderToString(allPeriods[i].title);
      console.log(allPeriods[i].title.props);
      if (allPeriods[i].title === latestPeriod) {
        return true;
      }
    }
  };

  const addNewPeriod = () => {
    if (!checkIfPeriodExists()) {
      for (var j = 0; j < allPeriods.length; j++) {
        if (allPeriods[j].title === "") {
          //   const parts = latestPeriod.split("-");
          //   console.log(parts);
          //   const newP = (
          //     <p>
          //       {parts[0]}-<span>{parts[1]}</span>
          //     </p>
          //   );
          //   console.log(newP);
          //   allPeriods[j].title = newP;
          allPeriods[j].title = latestPeriod;
          setCounter(counter + 1);
          console.log(counter);
          break;
        }
      }
    }
  };

  const passImages = (counter) => {
    let images = [];
    for (let i = 0; i < counter - 1; i++) {
      images.push(<img style={{ width: "14px" }} src={circle} alt="IMAG" />);
    }
    images.push(<img style={{ width: "30px" }} src={current} alt="question" />);
    for (let i = 0; i < 7 - counter; i++) {
      images.push(
        <img
          style={{ width: "15px" }}
          src={process.env.PUBLIC_URL + `/images/question-mark.png`}
          alt="question"
        />
      );
    }

    return images;
  };
  useEffect(() => {
    console.log("IN USE EFFECT TIMELINE");
    addNewPeriod();
    return () => {};
  }, [questionCounter, counter]);

  const images = passImages(counter);
  console.log(allPeriods);
  return (
    <div style={{ width: "100%" }}>
      <Chrono
        itemWidth="230"
        hideControls={true}
        items={allPeriods}
        allowDynamicUpdate={true}
        theme={{
          primary: "black",
          secondary: "red",
          cardBgColor: "yellow",
          cardForeColor: "violet",
          titleColor: "black",
        }}
        onItemSelected={() => console.log("ITEM WAS SELECTED")}
      >
        <div className="chrono-icons">{images}</div>
      </Chrono>
    </div>
  );
};

export default Timeline;
