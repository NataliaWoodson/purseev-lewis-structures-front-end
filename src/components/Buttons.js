import SubmitButton from "./SubmitButton";
import NextMoleculeButton from "./NextMoleculeButton";
import StartGameButton from "./StartGameButton";

const Buttons = ({
  updateMoleculeApp,
  verifyStructureValidityApp,
  submissionsApp,
  submitClickedApp,
  resetGameApp,
  gameStartedApp,
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

  // console.log("gameStartedApp in Buttons is", gameStartedApp);

  const submitButtonClass = () => {
    // if (submissions.length === 0) {
    //   return "hide";
    // } else

    // console.log(
    //   "in submitButtonClass function. gameStarted is",
    //   gameStartedApp
    // );
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
