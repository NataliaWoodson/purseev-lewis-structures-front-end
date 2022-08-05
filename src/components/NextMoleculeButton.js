import React, { useState } from "react";
import PropTypes from "prop-types";

const NextMoleculeButton = ({
  onGetNextMolecule,
  // onGenerateAtomDict,
  // onGenerateAtom,
}) => {
  // const [chemicalFormula, setChemicalFormula] = useState("");
  // const onUpdateMolecule = async (event) => {
  //   // let chemicalFormula = await props.onGetNextMolecule();
  //   // setChemicalFormula(chemicalFormula);
  //   // event.preventDefault();
  //   // setChemicalFormula(props.onGetNextMolecule());
  //   // console.log(chemicalFormula);
  //   onGetNextMolecule().then((chemicalFormula) => {
  //     const atomObj = generateNumAtomsDict(chemicalFormula);
  //     console.log(chemicalFormula);
  //     // const createAtoms = (atomObj) => {
  //     setAtoms(generateAtoms(atomObj));
  // });
  const onUpdateMolecule = (e) => {
    e.preventDefault();
    return onGetNextMolecule;
  };

  // };

  return (
    <section>
      <button onClick={onUpdateMolecule}>Next Molecule</button>
    </section>
  );
};

NextMoleculeButton.propTypes = {
  onGetNextMolecule: PropTypes.func.isRequired,
  // onGenerateAtomDict: PropTypes.func.isRequired,
  // onGenerateAtom: PropTypes.func.isRequired,
};

export default NextMoleculeButton;
