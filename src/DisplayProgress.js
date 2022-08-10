import React from "react";
// import "./styles.css";
// import the stylesheet
import StepProgressBar from "react-step-progress-bar";
// import { ProgressBar } from "react-step-progress-bar";
// import "react-step-progress/dist/index.css";

const DisplayProgress = ({ progDisplay, display }) => {
  const startStepContent = <h1>Begin Game. Bond the electrons</h1>;
  const endStepContent = <h1>"Game completed. Start new game."</h1>;

  // function stepValidator() {

  // }
  // // setup step validators, will be called before proceeding to the next step
  // function step2Validator() {
  //   return true;
  // }

  // function step5Validator() {
  //   // return a boolean
  // }
  return (
    <div className="App">
      <StepProgressBar
        startingStep={0}
        steps={[
          {
            label: { display },
            // name: "Briefing",
            content: startStepContent,
          },
          {
            label: "Question 2",
            // name: "Image-Acquisition",
            // content: step2Content
          },
          {
            label: "Question 3",
            // name: "Image Processing",
            // content: step3Content,
            // validator: step2Validator
          },
          {
            label: "Question 4",
            // name: "Image Processing",
            // content: step3Content,
            // validator: step2Validator
          },
          {
            label: "Question 5",
            // name: "Finish",
            content: endStepContent,
          },
        ]}
      />
    </div>
  );
};

export default DisplayProgress;
