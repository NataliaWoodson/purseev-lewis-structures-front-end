import "./App.css";
import { Stage, Layer, Text, Circle, Group } from "react-konva";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";

const STATE = {
  atomId: 0,
  electronId: 0,
};

const chemicalFormula = "CF3H";

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
      isPaired: false,
    },
    2: {
      x: pixelsDisplacement,
      y: 0,
      isPaired: false,
    },
  },
  3: {
    1: {
      x: 0,
      y: pixelsDisplacement,
      isPaired: false,
    },
    2: {
      x: pixelsDisplacement,
      y: 0,
      isPaired: false,
    },
    3: {
      x: 0,
      y: -pixelsDisplacement,
      isPaired: false,
    },
  },
  4: {
    1: {
      x: 0,
      y: pixelsDisplacement,
      isPaired: false,
    },
    2: {
      x: pixelsDisplacement,
      y: 0,
      isPaired: false,
    },
    3: {
      x: 0,
      y: -pixelsDisplacement,
      isPaired: false,
    },
    4: {
      x: -pixelsDisplacement,
      y: 0,
      isPaired: false,
    },
  },
  5: {
    1: {
      x: -pixelsLonePairShift,
      y: pixelsDisplacement,
      isPaired: true,
    },
    2: {
      x: pixelsDisplacement,
      y: 0,
      isPaired: false,
    },
    3: {
      x: 0,
      y: -pixelsDisplacement,
      isPaired: false,
    },
    4: {
      x: -pixelsDisplacement,
      y: 0,
      isPaired: false,
    },
    5: {
      x: pixelsLonePairShift,
      y: pixelsDisplacement,
      isPaired: true,
    },
  },
  6: {
    1: {
      x: -pixelsLonePairShift,
      y: pixelsDisplacement,
      isPaired: true,
    },
    2: {
      x: pixelsDisplacement,
      y: pixelsLonePairShift,
      isPaired: true,
    },
    3: {
      x: 0,
      y: -pixelsDisplacement,
      isPaired: false,
    },
    4: {
      x: -pixelsDisplacement,
      y: 0,
      isPaired: false,
    },
    5: {
      x: pixelsLonePairShift,
      y: pixelsDisplacement,
      isPaired: true,
    },
    6: {
      x: pixelsDisplacement,
      y: -pixelsLonePairShift,
      isPaired: true,
    },
  },
  7: {
    1: {
      x: -pixelsLonePairShift,
      y: pixelsDisplacement,
      isPaired: true,
    },
    2: {
      x: pixelsDisplacement,
      y: pixelsLonePairShift,
      isPaired: true,
    },
    3: {
      x: pixelsLonePairShift,
      y: -pixelsDisplacement,
      isPaired: true,
    },
    4: {
      x: -pixelsDisplacement,
      y: 0,
      isPaired: false,
    },
    5: {
      x: pixelsLonePairShift,
      y: pixelsDisplacement,
      isPaired: true,
    },
    6: {
      x: pixelsDisplacement,
      y: -pixelsLonePairShift,
      isPaired: true,
    },
    7: {
      x: -pixelsLonePairShift,
      y: -pixelsDisplacement,
      isPaired: true,
    },
  },
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
    components.push(thisComponent[0]);
    let thisComponentLength = thisComponent[0].length;
    formula = formula.slice(thisComponentLength);
  }

  return components;
};

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
      if (isNaN(component[1])) {
        numInc = 1;
        element = component;
      } else {
        numInc = parseInt(component[1]);
        element = component.slice(0, 1);
      }
    } else if (component.length === 1) {
      numInc = 1;
      element = component[0];
    } else {
      console.log("Formula components not parsed correctly");
    }

    if (formulaObj[element] === undefined) {
      formulaObj[element] = numInc;
    } else {
      formulaObj[element] = parseInt(formulaObj[element]) + numInc;
    }
  }
  return formulaObj;
};

const atomObj = generateNumAtomsDict();

const getElectronDataArray = (numElectrons) => {
  const nums = [...Array(numElectrons + 1).keys()]; // gets array from 1 - numElectrons inclusive
  nums.shift();
  const electronsDataArray = [];

  for (let num of nums) {
    const xDisplace = electronPositionDisplacements[numElectrons][num].x;
    const yDisplace = electronPositionDisplacements[numElectrons][num].y;
    const isPaired = electronPositionDisplacements[numElectrons][num].isPaired;
    const entry = {
      id: STATE.electronId,
      xDisplace: xDisplace,
      yDisplace: yDisplace,
      isPaired: isPaired,
    };
    electronsDataArray.push(entry);
    STATE.electronId++;
  }
  return electronsDataArray;
};

const elementSymbolArray = () => {
  let elementArray = [];

  for (const element in atomObj) {
    for (let i = 0; i < atomObj[element]; i++) {
      elementArray.push({
        elementSymbol: element,
        id: STATE.atomId,
      });
      STATE.atomId++;
    }
  }
  return elementArray;
};

const generateAtoms = () => {
  return elementSymbolArray().map((element) => ({
    id: element.id,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    text: element.elementSymbol,
    isDragging: false,
    electrons: getElectronDataArray(numElectronsObj[element.elementSymbol]),
  }));
};

function App() {
  const [atoms, setAtoms] = useState([]);

  useEffect(() => {
    createAtoms();
    STATE.atomId = 0;
    STATE.electronId = 0;
  }, []);

  const createAtoms = () => {
    setAtoms(generateAtoms());
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {atoms.map((atom) => (
          <Group draggable>
            <Circle
              x={atom.x + 10}
              y={atom.y + 13}
              fill="red"
              radius={45}
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
