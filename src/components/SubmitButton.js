import React, { useState } from "react";
import "./Buttons.css";

const SubmitButton = ({
  verifyStructureValidityButtons,
  submitButtonClassButtons,
  submissionsDisp,
  activeDisp,
  setActiveDisp,
  circleDisp,
}) => {
  // console.log("props in SubmitButton are", props);

  // const verifyStructureValidityApp = props.verifyStructureValidityApp;
  // const submissions = props.submissionData;

  // if (submissions.length === 5) {
  //   const thisButtonDOMObject = document.getElementsByClassName("show")[0];
  //   thisButtonDOMObject.className = "hide";
  // }
  const submitButtonClass = submitButtonClassButtons();

  const advanceProgressBar = () => {
    activeDisp > circleDisp
      ? setActiveDisp(circleDisp)
      : setActiveDisp(activeDisp + 1);
    // activeDisp > circleDisp
    //   ? setActiveDisp(circleDisp)
    //   : setActiveDisp(activeDisp + 1);
  };

  const handleClick = (event) => {
    event.preventDefault();
    advanceProgressBar();
    // console.log(verifyStructureValidityButtons);
    // console.log("registered Submit Button click");

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
