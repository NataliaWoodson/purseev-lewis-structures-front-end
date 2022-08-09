import React, { useState } from "react";

const SubmitButton = ({ verifyStructureValidityButtons }) => {
  // console.log("props in SubmitButton are", props);

  // const verifyStructureValidityApp = props.verifyStructureValidityApp;
  // const submissions = props.submissionData;

  // if (submissions.length === 5) {
  //   const thisButtonDOMObject = document.getElementsByClassName("show")[0];
  //   thisButtonDOMObject.className = "hide";
  // }

  const handleClick = (event) => {
    event.preventDefault();
    // console.log(verifyStructureValidityButtons);
    // console.log("registered Submit Button click");

    return verifyStructureValidityButtons();
  };

  return <button onClick={handleClick}>Submit</button>;
};

export default SubmitButton;
