import React from "react";
import "./PeriodicPopup.css";
import "../assets/PeriodicTable.png";
import periodicTableSource from "../assets/PeriodicTable.png";

const PeriodicPopup = (props) => {
  const handleClick = (e) => {
    props.toggle();
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <img
          className="periodicTable"
          src={periodicTableSource}
          alt="periodic table"
        />
      </div>
    </div>
  );
};

export default PeriodicPopup;
