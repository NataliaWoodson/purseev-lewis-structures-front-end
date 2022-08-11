import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

const MolecFormula = ({ display }) => {
  const formula = display;
  const result = formula.replace(/\d+/g, "<sub>$&</sub>");

  return (
    <div>
      <h1>Molecular Formula</h1>
      <h2>{result}</h2>
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
