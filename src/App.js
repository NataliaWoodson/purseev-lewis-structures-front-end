import logo from "./logo.svg";
import "./App.css";
import Atom from "./components/Atom";
import { Stage, Layer } from "react-konva";
import React, { useState, useEffect } from "react";
// import axios from 'axios';

const chemicalFormula = "C";

const getFormulaComponents = () => {
  let formula = chemicalFormula.slice();

  const getOneComponent = () => {
    const pattern = /^[A-Z][a-z]*[0-9]*/;
    const result = pattern.exec(formula);
    return result;
  };

  let components = [];

  while (getOneComponent() != null) {
    let thisComponent = getOneComponent();
    // console.log("thisComponent is", thisComponent);
    components.push(thisComponent[0]);
    let thisComponentLength = thisComponent[0].length;
    // console.log(thisComponentLength);
    formula = formula.slice(thisComponentLength);
    console.log(formula);
  }

  return components;
};

console.log(getFormulaComponents());

const generateNumAtomsDict = () => {
  let formulaObj = {};
  const components = getFormulaComponents();
  for (let component of components) {
    let element;
    let numInc;
    if (component.length === 3) {
      numInc = parseInt(component[2]);
      element = component.slice(0, 2);
    } else if (component.length === 2) {
      numInc = parseInt(component[1]);
      element = component.slice(0, 1);
    } else if (component.length === 1) {
      numInc = 1;
      element = component[0];
    } else {
      console.log("Formula components not parsed correctly");
    }
    console.log("element is", element);
    console.log("numInc is", numInc);
    if (formulaObj[element] === undefined) {
      formulaObj[element] = numInc;
      console.log("formulaObj[element] is", formulaObj[element]);
    } else {
      console.log("formulaObj[element] is", formulaObj[element]);
      formulaObj[element] = parseInt(formulaObj[element]) + numInc;
    }
  }
  return formulaObj;
};

const atomObj = generateNumAtomsDict();

console.log("atomObj is", atomObj);

// Atom object will come from API call
const elementSymbolArray = (atomObj) => {
  let elementArray = [];

  for (const element in atomObj) {
    for (let i = 0; i < atomObj[element]; i++) {
      elementArray.push(element);
    }
  }

  return elementArray;
};

const allAtoms = () => {
  // console.log("inside allAtoms");
  const elementArray = elementSymbolArray(atomObj);
  const getAtomDataJSX = elementArray.map((elementSymbol) => {
    return <Atom elementSymbolApp={elementSymbol} />;
  });

  return <div>{getAtomDataJSX}</div>;
};

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* </header> */}
      <main className="main">
        {allAtoms(elementSymbolArray)}

        {/* props will include list of atoms */}
        {/* <Stage
          className="stage"
          width={window.innerWindow}
          height={window.innerHeight}
        >
          <Layer>{allAtoms}</Layer>
        </Stage> */}
      </main>
    </div>
  );
}

export default App;
