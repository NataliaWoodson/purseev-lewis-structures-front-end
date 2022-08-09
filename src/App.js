import "./App.css";
import axios from "axios";
import { Stage, Layer, Text, Circle, Group } from "react-konva";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import { shapes } from "konva/lib/Shape";
import NextMoleculeButton from "./components/NextMoleculeButton";
import SubmitButton from "./components/SubmitButton";
import UserMessages from "./components/UserMessages";
import Buttons from "./components/Buttons";
// import NextMoleculeButton from "./components/NextMoleculeButton";

const STATE = {
  ids: 0,
  numRounds: 0,
  submitClicked: false,
  message: "Hello this is a test message.",
};

// const chemicalFormula = "H2O";

const kBaseUrl =
  "http://env-lewisstructuresmain.eba-u8ruwggm.us-west-2.elasticbeanstalk.com/lewis_structures_main";

const getMolecules = async () => {
  // e.preventDefault();
  console.log("entered getMolecules");
  try {
    return await axios.get(`${kBaseUrl}/molecules/`).then((response) => {
      const formulas = response.data.molecules;
      // console.log(formulas.length);
      const rand_formula =
        formulas[Math.floor(Math.random() * formulas.length)];
      const chemicalFormula = rand_formula["molecular_formula"];
      // console.log(chemicalFormula);
      return chemicalFormula;
    });
  } catch (err) {
    console.log(err);
  }
};

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

// const getMolecules = async (e) => {
//   e.preventDefault();
//   try {
//     await axios.get(`${kBaseUrl}/molecules/`).then((response) => {
//       const formulas = response.data.molecules;
//       // console.log(formulas.length);
//       const rand_formula =
//         formulas[Math.floor(Math.random() * formulas.length)];
//       const chemicalFormula = rand_formula["molecular_formula"];
//       return chemicalFormula;
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

const pixelsDisplacement = 30;
const pixelsLonePairShift = 10;

const windowSizeX = 1000;
const windowSizeY = 800;

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

const getFormulaComponents = (chemicalFormula) => {
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

const generateNumAtomsDict = (chemicalFormula) => {
  let formulaObj = {};
  const components = getFormulaComponents(chemicalFormula);
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

// const atomObj = generateNumAtomsDict();
// console.log("atomObj is", atomObj);
// const atomObj = generateNumAtomsDict();

const getElectronDataArray = (numElectrons, atomId) => {
  const nums = [...Array(numElectrons + 1).keys()]; // gets array from 1 - numElectrons inclusive
  nums.shift();
  const electronsDataArray = [];

  for (let num of nums) {
    const xDisplace = electronPositionDisplacements[numElectrons][num].x;
    const yDisplace = electronPositionDisplacements[numElectrons][num].y;
    const isPaired = electronPositionDisplacements[numElectrons][num].isPaired;
    const entry = {
      id: STATE.ids,
      xDisplace: xDisplace,
      yDisplace: yDisplace,
      isPaired: isPaired,
      atomId: atomId,
    };
    electronsDataArray.push(entry);
    STATE.ids++;
  }
  return electronsDataArray;
};

const elementSymbolArray = (atomObj) => {
  let elementArray = [];

  for (const element in atomObj) {
    for (let i = 0; i < atomObj[element]; i++) {
      elementArray.push({
        elementSymbol: element,
        id: STATE.ids,
      });
      STATE.ids++;
    }
  }
  return elementArray;
};

// const generateAtoms = () => {
//   const result = elementSymbolArray().map((element) => ({

const generateAtoms = (atomObj) => {
  return elementSymbolArray(atomObj).map((element) => ({
    id: element.id,
    x: (Math.random() * window.innerWidth) / 2,
    y: (Math.random() * window.innerHeight) / 2,
    text: element.elementSymbol,
    isDragging: false,
    electrons: getElectronDataArray(
      numElectronsObj[element.elementSymbol],
      element.id
    ),
  }));
  // console.log(result);
  // return result;
};

function App() {
  // const [atoms, setAtoms] = useState(INITIAL_STATE);
  const [connectors, setConnectors] = React.useState([]);
  const [fromShapeId, setFromShapeId] = React.useState(null);
  const [electrons, setElectrons] = React.useState(null);
  const [atoms, setAtoms] = useState([]);
  const [message, setMessage] = useState("Startup message.");
  const [submissions, setSubmissions] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const getElectronsArray = useCallback(() => {
    // console.log("hello");
    let electronList = [];
    for (let atom of atoms) {
      // console.log(`this is atom ${JSON.stringify(atom)}`);
      // console.log(typeof atom);
      electronList.push(...atom.electrons);
      // const thisElectron = atom.electrons.map((electron) => ({
      //   id: electron.id,
      //   xDisplace: electron.xDisplace,
      //   yDisplace: electron.yDisplace,
      //   isPaired: electron.isPaired,
      // })

      // console.log(`this electron: ${thisElectron.id}`);
      // for (let electron of atom.electrons) {
      //   console.log(`electron is: ${electron}`);
      //   electronList.push(electron);
      // }
    }
    // console.log({ electronList });

    setElectrons(electronList);
  }, [atoms]);

  // updates electrons state
  const updateElectronsArray = useCallback(
    (updatedElectronsArray) => {
      // console.log("updating electron array");
      // console.log("updatedElectron passed in is", updatedElectronsArray);
      const getUpdatedElectronIds = () => {
        let updatedIds = [];
        for (let passedElectron of updatedElectronsArray) {
          updatedIds.push(passedElectron.id);
        }
        return updatedIds;
      };

      const updatedElectronIds = getUpdatedElectronIds();
      // console.log("updatedElectronIds is", updatedElectronIds);
      let electronList = [];
      for (let electron of electrons) {
        // console.log(
        //   "electron.id is",
        //   electron.id,
        //   ". updatedElectron.id is",
        //   updatedElectron.id
        // );
        // console.log("current electron.id is", electron.id);
        if (updatedElectronIds.includes(electron.id)) {
          // console.log("pusing updated electron to electronList");
          for (let updatedElectron of updatedElectronsArray) {
            if (updatedElectron.id === electron.id) {
              electronList.push({
                id: electron.id,
                isPaired: updatedElectron.isPaired,
                xDisplace: updatedElectron.xDisplace,
                yDisplace: updatedElectron.yDisplace,
                atomId: electron.atomId,
              });
            }
          }
        } else {
          // console.log("pusing electron with no change to electronList");
          electronList.push(electron);
        }
        // console.log("electronList in progress", electronList);
      }
      // console.log("new electron list is", electronList);
      setElectrons(electronList);
    },
    [electrons]
  );

  const bondElectrons = (electronsArray) => {
    console.log("electronsArray passed into bondElectrons is", electronsArray);
    // check if isPaired status of either electron is already true
    const atomIds = [];
    for (let checkElectron of electronsArray) {
      atomIds.push(checkElectron.atomId);
      if (checkElectron.isPaired === true) {
        setMessage(
          "Invalid bond. You can only form a bond between two electrons if they are both unpaired."
        );
        console.log(
          "Invalid bond. Electron with id",
          checkElectron.id,
          "is already paired."
        );
        setFromShapeId(null);
        return null;
      }
    }
    // check if electron is being bonded to electron on same atom
    const atomIdsSet = new Set(atomIds);
    if (atomIds.length !== atomIdsSet.size) {
      setMessage("Invalid bond. Cannot bond electrons in the same atom.");
      console.log("Invalid bond. Cannot bond electrons in the same atom.");
      setFromShapeId(null);
      return null;
    }

    setMessage("That was a valid bond.");
    console.log("valid bond");
    const bondedElectronsArray = [];
    for (let selectedElectron of electronsArray) {
      // console.log("selectedElectron in second for-loop is", selectedElectron);
      const bondedElectron = {
        id: selectedElectron.id,
        xDisplace: selectedElectron.xDisplace,
        yDisplace: selectedElectron.yDisplace,
        isPaired: true,
        atomId: selectedElectron.atomId,
      };
      // console.log("bondedElectron on line 387 is", bondedElectron);
      bondedElectronsArray.push(bondedElectron);
    }
    updateElectronsArray(bondedElectronsArray);
  };

  // To be used as a helper function once we have a record of the connectors and their corresponding electrons.
  const breakBonds = (electronsArray) => {
    const unbondedElectronsArray = [];
    for (let selectedElectron of electronsArray) {
      // console.log("selectedElectron in second for-loop is", selectedElectron);
      const unbondedElectron = {
        id: selectedElectron.id,
        xDisplace: selectedElectron.xDisplace,
        yDisplace: selectedElectron.yDisplace,
        isPaired: false,
        atomId: selectedElectron.atomId,
      };
      // console.log("bondedElectron on line 387 is", bondedElectron);
      unbondedElectronsArray.push(unbondedElectron);
    }
    updateElectronsArray(unbondedElectronsArray);
  };

  const getElectronById = (id) => {
    for (let electron of electrons) {
      if (electron.id === id) {
        return electron;
      }
    }
  };

  const updateMolecule = useCallback(() => {
    console.log(
      "submissions are",
      submissions,
      ". numRounds is",
      STATE.numRounds
    );

    setGameStarted(true);

    // if (!submitClicked) {
    //   // console.log("entered call skip if statement");
    //   setMessage("You have skipped this question.");
    //   updateSubmissions("skip");
    // }
    if (submissions.length > 5) {
      return null;
    }
    setMessage("");
    STATE.numRounds++;
    setSubmitClicked(false);
    // console.log("increased num rounds", STATE.numRounds);
    if (STATE.numRounds <= 5) {
      getMolecules().then((chemicalFormula) => {
        const atomObj = generateNumAtomsDict(chemicalFormula);
        console.log(chemicalFormula);
        // const createAtoms = (atomObj) => {
        setAtoms(generateAtoms(atomObj));
      });
      // createAtoms();
      STATE.ids = 0;
    } else {
      // returnScore();
      console.log("played five rounds");
    }
  }, []);

  useEffect(() => {
    setGameStarted(false);
    // updateMolecule();
    // getMolecules().then((chemicalFormula) => {
    //   const atomObj = generateNumAtomsDict(chemicalFormula);
    //   console.log(chemicalFormula);
    //   // const createAtoms = (atomObj) => {
    //   setAtoms(generateAtoms(atomObj));
    // });
    // createAtoms();
    STATE.ids = 0;
  }, []);

  // const atomObj = generateNumAtomsDict(chemicalFormula);
  // const createAtoms = (atomObj) => {
  //   setAtoms(generateAtoms(atomObj));
  // };

  // useEffect(() => {
  //   createAtoms();
  //   STATE.ids = 0;
  // }, []);

  useEffect(() => {
    getElectronsArray();
  }, [getElectronsArray]);

  function handleSelectElectron(e) {
    // console.log(e.target);
    const electron = e.target.attrs;

    // console.log("selected electron is", electron);
    // console.log("electron.id is", electron.id);
    // bondElectron(electron);
  }

  const updateSubmissions = (result) => {
    if (submissions.length === 5) {
      console.log("Game completed. Start new game.");
      // setMessage(
      //   "Thanks for playing! Press the New Game button if you'd like to play again!"
      // );
      return "Game completed. Start new game.";
    }
    if (result === true && !submitClicked) {
      //probably don't need this first if statement and just use what is in else
      if (submissions.length === 0) {
        setSubmissions((current) => [
          ...current,
          {
            round: STATE.numRounds,
            score: true,
          },
        ]);
      } else {
        setSubmissions((current) => [
          ...current,
          {
            round: STATE.numRounds,
            score: true,
          },
        ]);
      }
    } else if (result === false && !submitClicked) {
      setSubmissions((current) => [
        ...current,
        {
          round: STATE.numRounds,
          score: false,
        },
      ]);
    } else {
      console.log("received a submit response other than true or false");
    }

    // else if (result === "skip") {
    //   console.log("In skipped submission update");
    //   setSubmissions((current) => [
    //     ...current,
    //     {
    //       round: STATE.numRounds,
    //       score: "skip",
    //     },
    //   ]);
    // }

    console.log(
      "round number is",
      STATE.numRounds,
      ". Submissions are",
      submissions
    );

    return submissions;
  };

  const verifyStructureValidity = () => {
    // console.log("Entered verifyStructureValidity function in App");
    setSubmitClicked(true);
    for (let electron of electrons) {
      if (electron.isPaired === false) {
        console.log("structure is invalid");
        setMessage(
          "This structure is invalid. See if you can find a way to bond electrons so that every single one is paired."
        );
        updateSubmissions(false);
        return false;
      }
    }
    console.log("structure is valid");
    // if (STATE.submissions.length === 0) {
    //   STATE.submissions.push({
    //     round: STATE.numRounds,
    //     score: true,
    //   });
    // } else if (
    //   STATE.submissions[STATE.submissions.length - 1].round === STATE.numRounds
    // ) {
    //   STATE.submissions.push({
    //     round: STATE.numRounds,
    //     score: true,
    //   });
    // }
    setMessage("Great job! This structure is correct!");
    updateSubmissions(true);
    return true;
  };

  // const returnScore = () => {
  //   if ()
  // }

  // let nextMoleculeRef = useRef(null);

  // const hideComponent = () => {

  // }

  const resetGame = () => {
    setSubmissions([]);
    setGameStarted(false);
    STATE.numRounds = 0;
    updateMolecule();
  };

  return (
    <main>
      <Header />
      <p>`${JSON.stringify(submissions)}`</p>
      <UserMessages message={message} />
      <Buttons
        updateMoleculeApp={updateMolecule}
        verifyStructureValidityApp={verifyStructureValidity}
        submissionsApp={submissions}
        submitClickedApp={submitClicked}
        resetGameApp={resetGame}
        gameStartedApp={gameStarted}
      />
      {/* <NextMoleculeButton className="show" onGetNextMolecule={updateMolecule} />
      <SubmitButton
        verifyStructureValidityApp={verifyStructureValidity}
        submissionData={submissions}
      /> */}
      <Stage width={window.innerWidth} height={window.innerHeight}>
        {/* <button value="nextMolecule" onClick={getMolecules}></button> */}
        <Layer>
          {connectors.map((con) => {
            const from = atoms.find((f) => f.id === con.from);
            const to = atoms.find((f) => f.id === con.to);

            // return (

            // <Line
            //   key={con.id}
            //   points={[from.x, from.y, to.x, to.y]}
            //   stroke="black"
            // />
            // );
          })}
          {atoms.map((atom) => (
            <Group key={atom.id} draggable>
              <Circle
                key={atom.id}
                id={atom.id.toString()}
                x={atom.x + 10}
                y={atom.y + 13}
                fill="red"
                radius={45}
                opacity={0.2}
              ></Circle>
              {atom.electrons.map((electron) => (
                <Circle
                  key={electron.id}
                  id={electron.id.toString()}
                  x={atom.x}
                  y={atom.y}
                  offsetX={electron.xDisplace - 10}
                  offsetY={electron.yDisplace - 12}
                  radius={5}
                  fill={fromShapeId === electron.id ? "red" : "black"}
                  onClick={() => {
                    setMessage("");
                    if (fromShapeId) {
                      const prevElectron = getElectronById(fromShapeId);
                      const thisElectron = getElectronById(electron.id);
                      bondElectrons([prevElectron, thisElectron]);
                      setFromShapeId(null);
                      // const newConnector = {
                      //   from: fromShapeId,
                      //   to: electron.id
                      // }
                    } else {
                      setFromShapeId(electron.id);
                    }
                  }}
                  onDblClick={() => {}}
                />
              ))}
              <Text x={atom.x} y={atom.y} text={atom.text} fontSize={30} />
            </Group>
          ))}
        </Layer>
      </Stage>
      {/* <button onClick={updateMolecule}> Next Molecule </button> */}
    </main>
  );
}

export default App;
