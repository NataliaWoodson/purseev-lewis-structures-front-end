import React from "react";
import "./PopUp.css";

const PopUp = (props) => {
  const handleClick = (e) => {
    props.toggle();
  };

  return (
    <div className="instructions-modal">
      <div className="modal-content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <ul>
          Instructions:
          <li>To begin please press "Start New Game" button.</li>
          <li>There are a total of 5 question.</li>
          <li>The purpose of the game is to make correct molecular bonds.</li>
          <li>You are able to drag atoms to better visualize the bonds.</li>
          <li>You can click two electrons to bond them.</li>
          <li>You can also click a bond to delete it.</li>
          <li>You can reset all bonds with the "Reset" button on the stage.</li>
          <li>
            Click the "Submit" button to check if you made a valid structure.
          </li>
          <li>
            The question number on the progress bar will fill green with a
            correct answer and red for an incorrect answer.
          </li>
          <li>You may only move to the next question after submitting.</li>
          <li>
            Click the "Next Molecule button" to move to the next molecule.
          </li>
          <li>The completed question number will be outlined in blue.</li>
          <li>You may restart the game to your heart's desire.</li>
        </ul>
      </div>
    </div>
  );
};

export default PopUp;
