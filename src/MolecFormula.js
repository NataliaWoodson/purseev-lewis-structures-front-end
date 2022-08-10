import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

const MolecFormula = ({ display }) => {
  return (
    <div>
      <h1>Molecular Formula</h1>
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
