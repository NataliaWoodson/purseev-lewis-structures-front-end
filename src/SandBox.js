import React from "react";
import "./styles.css";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";

const SandBox = ({ display }) => {
  const step1Content = <h1>You are right</h1>;
  const step2Content = <h1>b</h1>;
  const step3Content = <h1>c</h1>;

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }

  function step3Validator() {
    // return a boolean
  }
  return (
    <div className="App">
      <StepProgressBar
        startingStep={0}
        steps={[
          {
            label: "Hello",
            // name: "Whats up",
            content: "You are right",
          },
          {
            // label: "Image-Acquisition",
            // name: "Image-Acquisition",
            content: step2Content,
          },
          {
            // label: "Image-processing",
            // name: "Image Processing",
            content: step3Content,
            validator: step2Validator,
          },
          {
            // label: "Image-processing",
            // name: "Image Processing",
            content: step3Content,
            validator: step2Validator,
          },
          {
            // label: "Finish",
            // name: "Finish",
            content: step3Content,
          },
        ]}
      />
    </div>
  );
};

export default SandBox;
