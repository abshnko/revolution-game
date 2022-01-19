import React, { useState } from "react";
import { Chrono } from "react-chrono";
import { useEffect } from "react";
import circle from "../../images/circle-24.png";
import current from "../../images/current.png";

const Timeline = ({ latestPeriod, questionCounter }) => {
  const [counter, setCounter] = useState(() => {
    return JSON.parse(localStorage.getItem("period-counter")) || 1;
  });
  const [allPeriods, setAllPeriods] = useState(() => {
    //   const saved = JSON.parse(localStorage.getItem('periods'))
    return (
      JSON.parse(localStorage.getItem("periods")) || [
        { title: "1900-1914" },
        { title: "" },
        { title: "" },
        { title: "" },
        { title: "" },
        { title: "" },
        { title: "" },
      ]
    );
  });
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
          //   allPeriods[j].title = latestPeriod;
          const allPeriodsCopy = [...allPeriods];
          allPeriodsCopy[j].title = latestPeriod;
          setAllPeriods(allPeriodsCopy);
          setCounter(counter + 1);
          break;
        }
      }
    }
  };

  const passImages = (counter) => {
    let images = [];
    for (let i = 0; i < counter - 1; i++) {
      images.push(<img style={{ width: "23px" }} src={circle} alt="IMAG" />);
    }
    images.push(<img style={{ width: "30px" }} src={current} alt="question" />);
    for (let i = 0; i < 7 - counter; i++) {
      images.push(
        <img
          style={{ width: "20px" }}
          src={process.env.PUBLIC_URL + `/images/question-mark.png`}
          alt="question"
        />
      );
    }

    return images;
  };

  //   const getClientWidth = () => {
  //     return document.getElementsByTagName("body")[0].clientWidth;
  //   };
  const clientWidth = document.getElementsByTagName("body")[0].clientWidth;

  useEffect(() => {
    addNewPeriod();
    // localStorage.setItem("periods", JSON.stringify(allPeriods));
    // localStorage.setItem("period-counter", JSON.stringify(counter));
  }, [questionCounter, counter]);

  const images = passImages(counter);

  return (
    <div style={{ width: "100%" }}>
      <Chrono
        itemWidth={
          clientWidth >= 3500
            ? "450"
            : clientWidth >= 2400
            ? "285"
            : clientWidth >= 1920
            ? "230"
            : clientWidth >= 1600
            ? "190"
            : clientWidth >= 1440
            ? "170"
            : clientWidth >= 1360
            ? "170"
            : "130"
        }
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
