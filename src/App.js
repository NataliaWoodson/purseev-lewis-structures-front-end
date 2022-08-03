import "./App.css";
import Atom from "./components/Atom";
import { Stage, Layer, Text, Circle, Star, Group } from "react-konva";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
// import axios from 'axios';

const chemicalFormula = "H2O";

const numElectronsObj = {
  H: 1,
  B: 3,
  C: 4,
  N: 5,
  O: 6,
  F: 7,
  Al: 3,
  Si: 4,
  P: 5,
  S: 6,
  Cl: 7,
};

const pixelsDisplacement = 30;
const pixelsLonePairShift = 10;

const electronPositionDisplacements = {
  1: {
    1: {
      x: 0,
      y: pixelsDisplacement,
      isPaired: false,
    },
  },
  2: {
    1: {
      x: 0,
      y: pixelsDisplacement,
    },
    2: {
      x: pixelsDisplacement,
      y: 0,
    },
  },
  3: {
    1: {
      x: 0,
      y: pixelsDisplacement,
    },
    2: {
      x: pixelsDisplacement,
      y: 0,
    },
    3: {
      x: 0,
      y: -pixelsDisplacement,
    },
  },
  4: {
    1: {
      x: 0,
      y: pixelsDisplacement,
    },
    2: {
      x: pixelsDisplacement,
      y: 0,
    },
    3: {
      x: 0,
      y: -pixelsDisplacement,
    },
    4: {
      x: -pixelsDisplacement,
      y: 0,
    },
  },
  5: {
    1: {
      x: -pixelsLonePairShift,
      y: pixelsDisplacement,
    },
    2: {
      x: pixelsDisplacement,
      y: 0,
    },
    3: {
      x: 0,
      y: -pixelsDisplacement,
    },
    4: {
      x: -pixelsDisplacement,
      y: 0,
    },
    5: {
      x: pixelsLonePairShift,
      y: pixelsDisplacement,
    },
  },
  6: {
    1: {
      x: -pixelsLonePairShift,
      y: pixelsDisplacement,
    },
    2: {
      x: pixelsDisplacement,
      y: pixelsLonePairShift,
    },
    3: {
      x: 0,
      y: -pixelsDisplacement,
    },
    4: {
      x: -pixelsDisplacement,
      y: 0,
    },
    5: {
      x: pixelsLonePairShift,
      y: pixelsDisplacement,
    },
    6: {
      x: pixelsDisplacement,
      y: -pixelsLonePairShift,
    },
  },
  7: {
    1: {
      x: -pixelsLonePairShift,
      y: pixelsDisplacement,
    },
    2: {
      x: pixelsDisplacement,
      y: pixelsLonePairShift,
    },
    3: {
      x: pixelsLonePairShift,
      y: -pixelsDisplacement,
    },
    4: {
      x: -pixelsDisplacement,
      y: 0,
    },
    5: {
      x: pixelsLonePairShift,
      y: pixelsDisplacement,
    },
    6: {
      x: pixelsDisplacement,
      y: -pixelsLonePairShift,
    },
    7: {
      x: -pixelsLonePairShift,
      y: -pixelsDisplacement,
    },
  },
  8: {
    1: {
      x: -pixelsLonePairShift,
      y: pixelsDisplacement,
    },
    2: {
      x: pixelsDisplacement,
      y: pixelsLonePairShift,
    },
    3: {
      x: pixelsLonePairShift,
      y: -pixelsDisplacement,
    },
    4: {
      x: -pixelsDisplacement,
      y: -pixelsLonePairShift,
    },
    5: {
      x: pixelsLonePairShift,
      y: pixelsDisplacement,
    },
    6: {
      x: pixelsDisplacement,
      y: -pixelsLonePairShift,
    },
    7: {
      x: -pixelsLonePairShift,
      y: -pixelsDisplacement,
    },
    8: {
      x: -pixelsDisplacement,
      y: pixelsLonePairShift,
    },
  },
};

const atomPosition = {
  x: 100,
  y: 100,
};

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
    // console.log(formula);
  }

  return components;
};

// console.log(getFormulaComponents());

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
    // console.log("element is", element);
    // console.log("numInc is", numInc);
    if (formulaObj[element] === undefined) {
      formulaObj[element] = numInc;
      // console.log("formulaObj[element] is", formulaObj[element]);
    } else {
      // console.log("formulaObj[element] is", formulaObj[element]);
      formulaObj[element] = parseInt(formulaObj[element]) + numInc;
    }
  }
  return formulaObj;
};

const atomObj = generateNumAtomsDict();

console.log(atomObj);

// console.log("atomObj is", atomObj);

// Atom object will come from API call
// const elementSymbolArray = () => {
//   let elementArray = [];

//   for (const element in atomObj) {
//     for (let i = 0; i < atomObj[element]; i++) {
//       elementArray.push(element);
//     }
//   }
//   console.log("elementArray is", elementArray);
//   return elementArray;
// };

const elementSymbolArray = () => {
  let elementArray = [];

  for (const element in atomObj) {
    for (let i = 0; i < atomObj[element]; i++) {
      elementArray.push({
        elementSymbol: element,
        atomId: i,
      });
    }
  }

  return elementArray;
};

console.log("elementSymbolArray is", elementSymbolArray());

const allAtoms = () => {
  // console.log("inside allAtoms");
  const elementArray = elementSymbolArray();
  const getAtomDataJSX = elementArray.map((elementSymbol) => {
    return <Atom elementSymbolApp={elementSymbol} />;
  });

  return <div>{getAtomDataJSX}</div>;
};

// const numElectrons = numElectronsObj[elementSymbol];

const getElectronDataArray = (numElectrons) => {
  const nums = [...Array(numElectrons + 1).keys()]; // gets array from 1 - numElectrons inclusive
  nums.shift();
  const electronsDataArray = [];

  for (let num of nums) {
    // console.log("nums is", nums);
    // console.log("this iteration num is", num);
    const xDisplace = electronPositionDisplacements[numElectrons][num].x;
    const yDisplace = electronPositionDisplacements[numElectrons][num].y;
    const entry = {
      electronId: num,
      xDisplace: xDisplace,
      yDisplace: yDisplace,
    };
    electronsDataArray.push(entry);
    // console.log("entry is", entry);
  }
  return electronsDataArray;
};

// console.log("electronDataArray is", getElectronDataArray(3));

const getOneSetOfElectronsData = (elementSymbol, electronNum) => {};

const getOneAtom = (elementSymbol, atomId) => {
  // const nums = [...Array(numElectrons + 1).keys()]; // gets array from 1 - numElectrons inclusive
  // nums.shift();
  const numElectrons = numElectronsObj[elementSymbol];
  const electronsDataArray = getElectronDataArray(numElectrons);

  return {
    id: atomId,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    text: elementSymbol,
    isDragging: false,
    electrons: electronsDataArray,
  };
};

console.log(getOneAtom("H", 1));

const generateAtoms = () => {
  return elementSymbolArray().map((element) => ({
    id: element.id,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    text: element.elementSymbol,
    isDragging: false,
    electrons: getElectronDataArray(numElectronsObj[element.elementSymbol]),
    // element.electrons.map((electron) => {
    //   x:
    // })
  }));
};

const INITIAL_STATE = generateAtoms();

function App() {
  const [atoms, setAtoms] = useState(INITIAL_STATE);

  console.log("INITIAL_STATE is", INITIAL_STATE);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {atoms.map((atom) => (
          <Group draggable>
            <Circle
              x={atom.x + 10}
              y={atom.y + 13}
              fill="red"
              radius={50}
              opacity={0.2}
            ></Circle>
            {atom.electrons.map((electron) => (
              <Circle
                x={atom.x}
                y={atom.y}
                offsetX={electron.xDisplace - 10}
                offsetY={electron.yDisplace - 12}
                radius={5}
                fill="black"
              />
            ))}
            <Text x={atom.x} y={atom.y} text={atom.text} fontSize={30} />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
