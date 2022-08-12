import React, { useState, useEffect } from "react";
import "./MolecFormula.css";
// import PropTypes from "prop-types";

const MolecFormula = ({ display }) => {
  const numToSubObj = {
    0: "₀",
    1: "₁",
    2: "₂",
    3: "₃",
    4: "₄",
    5: "₅",
    6: "₆",
    7: "₇",
    8: "₈",
    9: "₉",
  };

  // const formula = display;
  // const result = formula.replace(/\d+/g, "<sub>$&</sub>");

  let correctFormula = "";

  for (const char of display) {
    if (char in numToSubObj) {
      correctFormula += numToSubObj[char];
    } else {
      correctFormula += char;
    }
  }
  return (
    <div className="formula-header">
      <div className="header-container">
        <h1>Molecular Formula</h1>
      </div>
      <h2>{correctFormula}</h2>
    </div>
  );
};
// console.log({getMolecules})
// const [molecFormula, setMolecFormula] = useState([]);
// console.log("!!!!");
// setMolecFormula(getMolecules);
//   useEffect(() => {
//     setMolecFormula(getMolecules);
//   }, []);
//   console.log(molecFormula);
//   return molecFormula.map((molecule) => <li>{molecule}</li>);
// };

// MolecFormula.propTypes = {
//   getMolecules: PropTypes.func.isRequired,
// };

export default MolecFormula;
