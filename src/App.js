import logo from "./logo.svg";
import "./App.css";
import Atom from "./components/Atom";
import { Stage, Layer } from "react-konva";
import React, { useState, useEffect } from "react";
// import axios from 'axios';

const chemicalFormula = "H2";

const convertFormulaToObj = () => {
  return null;
};

const atomDictionary = {
  H: 2,
};

// Atom dictionary will come from API call
const elementSymbolArray = (atomDictionary) => {
  let elementArray = [];

  for (const element in atomDictionary) {
    for (let i = 0; i < atomDictionary[element]; i++) {
      elementArray.push(element);
    }
  }

  return elementArray;
};

const allAtoms = () => {
  console.log("inside allAtoms");
  const elementArray = elementSymbolArray(atomDictionary);
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
