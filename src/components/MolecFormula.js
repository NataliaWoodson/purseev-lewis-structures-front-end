import React, { useState, useEffect } from "react";
import "./MolecFormula.css";
// import PropTypes from "prop-types";

const MolecFormula = ({ display }) => {
  return (
    <div className="formula-header">
      <div className="header-container">
        <h1>Molecular Formula</h1>
      </div>
      <h2>{display}</h2>
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
