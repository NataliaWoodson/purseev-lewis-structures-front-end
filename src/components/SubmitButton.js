import React, { useState } from "react";

const SubmitButton = (props) => {
  console.log("props in SubmitButton are", props);

  const verifyStructureValidityApp = props.verifyStructureValidityApp;
  const handleClick = (event) => {
    event.preventDefault();
    console.log(verifyStructureValidityApp);
    console.log("registered Submit Button click");

    return verifyStructureValidityApp();
  };

  return <button onClick={handleClick}>Submit</button>;
};

export default SubmitButton;
