import SubmitButton from "./SubmitButton";
import NextMoleculeButton from "./NextMoleculeButton";
import StartGameButton from "./StartGameButton";

const Buttons = ({
  updateMoleculeApp,
  verifyStructureValidityApp,
  submissionsApp,
  submitClickedApp,
  resetGameApp,
}) => {
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

  console.log("submitClicked in Buttons is", submitClickedApp);
  console.log(
    "result from nextMoleculeClass in Buttons is",
    nextMoleculeClass()
  );

  const submitButtonClass = () => {
    // if (submissions.length === 0) {
    //   return "hide";
    // } else

    if (submissions.length === 4) {
      return "hide";
    } else {
      return "show";
    }
  };

  const startGameButtonClass = () => {
    if (submissions.length === 5) {
      return "show";
    } else {
      return "hide";
    }
  };

  return (
    <div>
      <NextMoleculeButton
        updateMoleculeButtons={updateMoleculeApp}
        nextMoleculeClassButtons={nextMoleculeClass}
      />
      <SubmitButton
        verifyStructureValidityButtons={verifyStructureValidity}
        submitButtonClassButtons={submitButtonClass}
      />
      <StartGameButton
        startGameButtonClassButtons={startGameButtonClass}
        resetGameButtons={resetGame}
      />
    </div>
  );
};

export default Buttons;
