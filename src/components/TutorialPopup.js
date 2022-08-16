import React from "react";
import "./TutorialPopup.css";

const TutorialPopUp = (props) => {
  const handleClick = (e) => {
    props.toggle();
  };

  return (
    <div className="tutorial-modal">
      <div className="tutorial-modal-content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/HsTYqb9jTAg"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default TutorialPopUp;
