// import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Buttons.css";

const NextMoleculeButton = ({
  updateMoleculeButtons,
  nextMoleculeClassDisp,
  // advanceProgressBarDisp,
  activeDisp,
  circleDisp,
  setActiveDisp,
  submitClickedDisp,
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
  const advanceProgressBar = () => {
    activeDisp > circleDisp
      ? setActiveDisp(circleDisp)
      : setActiveDisp(activeDisp + 1);
    // activeDisp > circleDisp
    //   ? setActiveDisp(circleDisp)
    //   : setActiveDisp(activeDisp + 1);
  };

  const onHandleClick = (e) => {
    e.preventDefault();
    updateMoleculeButtons();
    // advanceProgressBar();
  };

  const nextMoleculeClass = nextMoleculeClassDisp();
  // const nextMoleculeClass = nextMoleculeClassButtons();
  // console.log("nextMoleculeClass is", nextMoleculeClass);
  // };

  return (
    <section>
      <button
        onClick={onHandleClick}
        className={`${"next-mol-button"} ${nextMoleculeClass}`}
        // disabled={activeDisp >= circleDisp - 1 ? true : false}
        disabled={submitClickedDisp ? false : true}
      >
        Next Molecule
      </button>
    </section>
  );
};

NextMoleculeButton.propTypes = {
  onGetNextMolecule: PropTypes.func.isRequired,
};

export default NextMoleculeButton;
