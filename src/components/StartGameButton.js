import React from "react";

const StartGameButton = ({ startGameButtonClassButtons, resetGameButtons }) => {
  const startGameClass = startGameButtonClassButtons();
  const resetGame = resetGameButtons;

  const handleClick = (event) => {
    event.preventDefault();

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
