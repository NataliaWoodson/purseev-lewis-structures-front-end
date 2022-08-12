import React, { useState } from "react";
import "./Buttons.css";

const SubmitButton = ({
  verifyStructureValidityButtons,
  submitButtonClassButtons,
  submissionsDisp,
  circleDisp,
  activeDisp,
  setActiveDisp,
  // advanceProgressBarDisp
}) => {
  // console.log("props in SubmitButton are", props);

  // const verifyStructureValidityApp = props.verifyStructureValidityApp;
  // const submissions = props.submissionData;

  // if (submissions.length === 5) {
  //   const thisButtonDOMObject = document.getElementsByClassName("show")[0];
  //   thisButtonDOMObject.className = "hide";
  // }
  const advanceProgressBar = () => {
    if (activeDisp === 5) {
      return;
    }
    activeDisp > circleDisp
      ? setActiveDisp(circleDisp)
      : setActiveDisp(activeDisp + 1);
    // activeDisp > circleDisp
    //   ? setActiveDisp(circleDisp)
    //   : setActiveDisp(activeDisp + 1);
  };

  const submitButtonClass = submitButtonClassButtons();

  const handleClick = (event) => {
    event.preventDefault();
    // console.log(verifyStructureValidityButtons);
    // console.log("registered Submit Button click");
    advanceProgressBar();
    verifyStructureValidityButtons();
  };

  return (
    <button
      className={`${"submit-button"} ${submitButtonClass}`}
      onClick={handleClick}
      // className={submissionsDisp.length === 5 ? "hide" : "show"}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
