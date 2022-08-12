import React, { useEffect } from "react";
import { useState } from "react";
import "./DisplayProgress2.css";
import NextMoleculeButton from "./NextMoleculeButton";
import SubmitButton from "./SubmitButton";

import StartGameButton from "./StartGameButton";
// import Konva from "konva";

const DisplayProgress2 = ({
  updateMoleculeApp,
  verifyStructureValidityApp,
  submissionsApp,
  submitClickedApp,
  resetGameApp,
  gameStartedApp,
}) => {
  const [circle] = useState(6);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const submissions = submissionsApp;

  const verifyStructureValidity = verifyStructureValidityApp;
  const resetGame = resetGameApp;

  const nextMoleculeClass = () => {
    if (!submitClickedApp) {
      return "hide";
    } else if (submissions.length === 5) {
      return "hide";
    } else {
      return "show";
    }
  };
  const submitButtonClass = () => {
    if (!gameStartedApp) {
      return "hide";
    } else {
      return "show";
    }
  };

  const startGameButtonClass = () => {
    if (!gameStartedApp) {
      return "show";
    } else if (submissions.length === 5) {
      return "show";
    } else {
      return "hide";
    }
  };

  // const onUpdateMolecule = (e) => {
  //   e.preventDefault();
  //   updateMoleculeButtons();
  // };

  const chooseCircleFill = (round) => {
    if (round > submissions.length) {
      return "gray";
    } else {
      for (const submission of submissions) {
        if (submission.round === round) {
          if (submission.score === true) {
            return "green";
          } else {
            return "red";
          }
        }
      }
    }
  };

  const Circle = ({ classname, children }) => {
    return <div className={classname}>{children}</div>;
    // return <div className="circle">{1}</div>;
  };

  useEffect(() => {
    setWidth((100 / (circle - 1)) * active);
  }, [circle, active]);
  const arr = [];
  for (let i = 1; i < circle; i++) {
    arr.push(
      <Circle
        classname={`${
          i <= active ? "circle active" : "circle"
        } ${chooseCircleFill(i)}`}
        key={i}
      >
        {i}
      </Circle>
      //  <Circle classname={i <= active ? "circle active" : "circle"} key={i}>
      //   {i}
      // </Circle> */}
    );
  }

  // const advanceProgressBar = () => {
  //   active > circle ? setActive(circle) : setActive(active + 1);
  // };

  return (
    <div className="container">
      <div className="content">
        <div className="progressbar">
          <div className="progress" style={{ width: width + "%" }}></div>
          {arr}
        </div>
        <div className="button">
          {/* <button
            className="prev btn"
            disabled={active > 1 ? false : true}
            onClick={() => {
              active <= 0 ? setActive(0) : setActive(active - 1);
            }}
          >
            Prev
          </button> */}
          {/* <div className="button-container"></div> */}
          <StartGameButton
            startGameButtonClassButtons={startGameButtonClass}
            resetGameButtons={resetGame}
            setActiveDisp={setActive}
            setWidthDisp={setWidth}
          />
          <SubmitButton
            verifyStructureValidityButtons={verifyStructureValidity}
            submitButtonClassButtons={submitButtonClass}
            submissionsDisp={submissions}
            circleDisp={circle}
            activeDisp={active}
            setActiveDisp={setActive}
            // advanceProgressBarDisp={advanceProgressBar}
          />
          <NextMoleculeButton
            activeDisp={active}
            setActiveDisp={setActive}
            circleDisp={circle}
            // className="next btn"
            // nextMoleculeClassButtons={nextMoleculeClass}
            nextMoleculeClassDisp={nextMoleculeClass}
            submitClickedDisp={submitClickedApp}
            // disabled={active >= circle - 1 ? true : false}
            // onClick={() => {
            //   active > circle ? setActive(circle) : setActive(active + 1);
            // }}
            updateMoleculeButtons={updateMoleculeApp}
            // advanceProgressBarDisp={advanceProgressBar}
          ></NextMoleculeButton>
        </div>
      </div>
    </div>
  );
};

export default DisplayProgress2;
