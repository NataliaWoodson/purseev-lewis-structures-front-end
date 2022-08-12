import React from "react";

const StartGameButton = ({
  startGameButtonClassButtons,
  setActiveDisp,
  setWidthDisp,
  resetGameButtons,
}) => {
  const startGameClass = startGameButtonClassButtons();
  const resetGame = resetGameButtons;

  const handleClick = (event) => {
    event.preventDefault();
    setActiveDisp(0);
    setWidthDisp(0);
    resetGame();
  };

  return (
    <button
      className={`${"start-button"} ${startGameClass}`}
      onClick={handleClick}
    >
      Start New Game
    </button>
  );
};

export default StartGameButton;
