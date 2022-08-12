import React from "react";

const StartGameButton = ({
  startGameButtonClassButtons,
  setActiveDisp,
  resetGameButtons,
}) => {
  const startGameClass = startGameButtonClassButtons();
  const resetGame = resetGameButtons;

  const handleClick = (event) => {
    event.preventDefault();
    setActiveDisp(0);
    return resetGame();
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
