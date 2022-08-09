import React from "react";

const StartGameButton = ({ startGameButtonClassButtons }) => {
  const startGameClass = startGameButtonClassButtons();

  return <button className={startGameClass}>Start New Game</button>;
};

export default StartGameButton;
