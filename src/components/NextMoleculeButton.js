import React, { useState } from "react";
import PropTypes from "prop-types";

const NextMoleculeButton = ({
  updateMoleculeButtons,
  nextMoleculeClassButtons,
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
    updateMoleculeButtons();
  };

  const nextMoleculeClass = nextMoleculeClassButtons();
  // console.log("nextMoleculeClass is", nextMoleculeClass);
  // };

  return (
    <section>
      <button onClick={onUpdateMolecule} className={nextMoleculeClass}>
        Next Molecule
      </button>
    </section>
  );
};

NextMoleculeButton.propTypes = {
  onGetNextMolecule: PropTypes.func.isRequired,
};

export default NextMoleculeButton;
