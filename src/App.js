import "./App.css";
import axios from "axios";
import { Stage, Layer, Text, Circle, Group, Line } from "react-konva";
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
  "https://lewis-structures.purseev-api.com/lewis_structures_main";
// "https://env-lewisstructuresmain.eba-u8ruwggm.us-west-2.elasticbeanstalk.com/lewis_structures_main";

// "http://env-lewisstructuresmain.eba-u8ruwggm.us-west-2.elasticbeanstalk.com/lewis_structures_main";

const getMolecules = async () => {
  // e.preventDefault();
  // console.log("entered getMolecules");
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

const getElectronDataArray = (numElectrons, atomId, xAtom, yAtom) => {
  console.log("electrons being generated");
  console.log("xAtom passed in");
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
      x: xAtom,
      y: yAtom,
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
  const atomData = [];
  for (let element of elementSymbolArray(atomObj)) {
    let x = (Math.random() * window.innerWidth) / 2;
    let y = (Math.random() * window.innerHeight) / 2;
    atomData.push({
      id: element.id,
      x: x,
      y: y,
      text: element.elementSymbol,
      isDragging: false,
      electrons: getElectronDataArray(
        numElectronsObj[element.elementSymbol],
        element.id,
        x,
        y
      ),
    });
  }
  console.log("atomData in generateAtoms is", atomData);
  return atomData;

  // elementSymbolArray(atomObj).map((element) => ({
  //   id: element.id,
  //   x: (Math.random() * window.innerWidth) / 2,
  //   y: (Math.random() * window.innerHeight) / 2,
  //   text: element.elementSymbol,
  //   isDragging: false,
  //   electrons: getElectronDataArray(
  //     numElectronsObj[element.elementSymbol],
  //     element.id,
  //     element.x,
  //     element.y
  //   ),
  // }));
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
  const [bondedElectronIds, setBondedElectronIds] = useState(null);
  const [lineData, setLineData] = useState([]);

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
                x: updatedElectron.x,
                y: updatedElectron.y,
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

  const updateOneAtomPositionState = useCallback(
    (selectedAtomId, updatedAtomX, updatedAtomY) => {
      console.log("new x passed in", updatedAtomX);
      const updatedAtomData = [];
      for (let atom of atoms) {
        if (atom.id === selectedAtomId) {
          updatedAtomData.push({
            id: atom.id,
            x: updatedAtomX,
            y: updatedAtomY,
            text: atom.text,
            isDragging: false,
            electrons: atom.electrons,
          });
        } else {
          updatedAtomData.push(atom);
        }
      }
      console.log(updatedAtomData);
      setAtoms(updatedAtomData);
    },
    [atoms]
  );

  const getUpdatedElectronsDataAfterAtomDrag = (atomId) => {
    const updatedElectronsArray = [];
    const associatedAtomCoordinates = getAtomPositionById(atomId);
    const x = associatedAtomCoordinates[0];
    const y = associatedAtomCoordinates[1];
    for (let electron of electrons) {
      if (electron.atomId === atomId) {
        updatedElectronsArray.push({
          id: electron.id,
          isPaired: electron.isPaired,
          xDisplace: electron.xDisplace,
          yDisplace: electron.yDisplace,
          x: x,
          y: y,
          atomId: electron.atomId,
        });
      } else {
        updatedElectronsArray.push(electron);
      }
    }
    return updatedElectronsArray;
  };

  let coordinatesList = [];

  const getAtomPositionById = (atomId) => {
    for (let atom of atoms) {
      if (atom.id === atomId) {
        return [atom.x, atom.y];
      }
    }
  };

  const bondElectrons = (
    electronsArray,
    firstElectronEvent,
    secondElectronEvent
  ) => {
    console.log("electronsArray passed into bondElectrons is", electronsArray);
    console.log("firstElectronEvent is", firstElectronEvent);
    console.log("secondElectronEvent is", secondElectronEvent);
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
    const newElectronConnecterData = [];

    // const bondedElectronsArray = [];
    for (let selectedElectron of electronsArray) {
      // console.log("selectedElectron in second for-loop is", selectedElectron);
      const bondedElectron = {
        id: selectedElectron.id,
        xDisplace: selectedElectron.xDisplace,
        yDisplace: selectedElectron.yDisplace,
        x: selectedElectron.x,
        y: selectedElectron.y,
        isPaired: true,
        atomId: selectedElectron.atomId,
      };
      // console.log("bondedElectron on line 387 is", bondedElectron);
      // bondedElectronsArray.push(bondedElectron);
      newElectronConnecterData.push(selectedElectron.id);
    }
    // updateElectronsArray(bondedElectronsArray);

    setLineData((current) => [...current, newElectronConnecterData]);

    //First electron capture coordinates
    const x1 = firstElectronEvent.target.attrs.x;
    const y1 = firstElectronEvent.target.attrs.y;
    const id1 = parseInt(firstElectronEvent.target.attrs.id);
    const offsetX1 = firstElectronEvent.target.attrs.offsetX;
    const offsetY1 = firstElectronEvent.target.attrs.offsetY;
    const bondedElectronDict1 = {
      id: id1,
      x: x1,
      y: y1,
      offsetX: offsetX1,
      offsetY: offsetY1,
    };
    coordinatesList.push(bondedElectronDict1);
    console.log(coordinatesList);
    // const dictLength = Object.keys(bondedElectronDict).length;
    const x2 = secondElectronEvent.target.attrs.x;
    const y2 = secondElectronEvent.target.attrs.y;
    const id2 = parseInt(secondElectronEvent.target.attrs.id);
    const offsetX2 = secondElectronEvent.target.attrs.offsetX;
    const offsetY2 = secondElectronEvent.target.attrs.offsetY;
    const bondedElectronDict2 = {
      id: id2,
      x: x2,
      y: y2,
      offsetX: offsetX2,
      offsetY: offsetY2,
    };
    coordinatesList.push(bondedElectronDict2);
    console.log(coordinatesList);
    // Second electron capture coordinates

    // drawLine(coordinatesList);
    coordinatesList = [];
    // if (coordinatesList.length === 2) {
    //   drawLine(coordinatesList);
    //   coordinatesList = [];
    // }
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
  ///////////////////
  const getElectronById = (id) => {
    for (let electron of electrons) {
      if (electron.id === parseInt(id)) {
        return electron;
      }
    }
  };

  const updateMolecule = useCallback(() => {
    // console.log(
    //   "submissions are",
    //   submissions,
    //   ". numRounds is",
    //   STATE.numRounds
    // );

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
    setConnectors([]);
    setSubmitClicked(false);
    // console.log("increased num rounds", STATE.numRounds);
    if (STATE.numRounds <= 5) {
      getMolecules().then((chemicalFormula) => {
        const atomObj = generateNumAtomsDict(chemicalFormula);
        // console.log(chemicalFormula);
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
    // setConnectors([]);
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

  const verifyUnpaired = (id) => {
    const clickElectron = getElectronById(id);
    console.log({ clickElectron });
    if (clickElectron.isPaired === true) {
      console.log("This paired already");
      return true;
    }
    // const clickElectron = electron.id;
  };

  const connectLine = (e) => {
    console.log(e.target);
    const electronId = e.target.attrs.id;
    if (verifyUnpaired(electronId) === true) {
      console.log("you can't paired");
      return;
    } else {
      const x = e.target.attrs.x;
      const y = e.target.attrs.y;
      const id = e.target.index;
      const offsetX = e.target.attrs.offsetX;
      const offsetY = e.target.attrs.offsetY;
      const bondedElectronDict = {
        id: id,
        x: x,
        y: y,
        offsetX: offsetX,
        offsetY: offsetY,
      };
      coordinatesList.push(bondedElectronDict);
      console.log({ coordinatesList });
      // const dictLength = Object.keys(bondedElectronDict).length;

      if (coordinatesList.length === 2) {
        drawLine(coordinatesList);
        coordinatesList = [];
      }
    }
  };

  function drawLine(coordinatesList) {
    // console.log({ coordinatesList });
    // console.log(coordinatesList[0]["x"]);

    // console.log("coordinatesList[0]['x'] is", coordinatesList[0]["x"]);
    const newConnector = [
      Number(coordinatesList[0]["x"] - coordinatesList[0]["offsetX"]),
      Number(coordinatesList[0]["y"] - coordinatesList[0]["offsetY"]),
      Number(coordinatesList[1]["x"] - coordinatesList[1]["offsetX"]),
      Number(coordinatesList[1]["y"] - coordinatesList[1]["offsetY"]),
    ];
    if (!connectors.includes(newConnector)) {
      setConnectors((current) => [...current, newConnector]);
    }

    // console.log({ connectors });
  }

  const returnPointsUsingElectronIds = (entry) => {
    console.log("entry in returnPointsUsingElectronIds is", entry);
    const electronId1 = entry[0];
    const electronId2 = entry[1];
    const electron1 = getElectronById(electronId1);
    const electron2 = getElectronById(electronId2);

    console.log("electron1 is", electron1);

    const atomId1 = electron1.atomId;
    const atomId2 = electron2.atomId;
    console.log("electronId1 is", electronId1);
    console.log("atomId1 is", atomId1);

    const atom1x = getAtomPositionById(atomId1)[0];
    const atom1y = getAtomPositionById(atomId1)[1];

    const atom2x = getAtomPositionById(atomId2)[0];
    const atom2y = getAtomPositionById(atomId2)[1];
    console.log(`atom2 = (${atom2x}, ${atom2y})`);

    const electron1offsetX = electron1.xDisplace;
    const electron1offsetY = electron1.yDisplace;

    console.log("electron1offsetX is", electron1offsetX);

    const electron2offsetX = electron2.xDisplace;
    const electron2offsetY = electron2.yDisplace;

    const points = [
      atom1x + electron1offsetX,
      atom1y + electron1offsetY,
      atom2x + electron2offsetX,
      atom2y + electron2offsetY,
    ];

    console.log("points are", points);
    return points;
  };

  const updateAtomPosition = (e) => {
    console.log(e);
    const selectedAtomId = parseInt(e.target.attrs.id);
    const deltaX = e.target.attrs.x;
    const deltaY = e.target.attrs.y;

    for (let atom of atoms) {
      if (atom.id === selectedAtomId) {
        console.log("original (x,y): (", atom.x, ",", atom.y, ")");
        const newX = atom.x + deltaX;
        const newY = atom.y + deltaY;
        console.log("new (x,y): (", newX, ",", newY, ")");
        updateOneAtomPositionState(selectedAtomId, deltaX, deltaY);
      }
    }
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
      <Stage id={"stage"} width={window.innerWidth} height={window.innerHeight}>
        {/* <button value="nextMolecule" onClick={getMolecules}></button> */}
        <Layer>
          {/* {connectors.map((con) => {
            const from = atoms.find((f) => f.id === con.from);
            const to = atoms.find((f) => f.id === con.to); */}

          {/* // return ( */}

          {/* // <Line */}
          {/* //   key={con.id}
            //   points={[from.x, from.y, to.x, to.y]}
            //   stroke="black"
            // />
            // );
          // })} */}
          {atoms.map((atom) => (
            <Group
              // key={atom.id}
              id={atom.id.toString()}
              draggable
              x={atom.x}
              y={atom.y}
              onDragMove={(e) => {
                updateAtomPosition(e);
              }}
            >
              <Circle
                key={atom.id}
                // id={atom.id.toString()}
                x={0}
                y={0}
                fill="red"
                radius={45}
                opacity={0.2}
                onClick={(e) => {
                  console.log(e);
                }}
              ></Circle>
              {atom.electrons.map((electron) => (
                <Circle
                  key={electron.id}
                  id={electron.id.toString()}
                  x={0}
                  y={0}
                  offsetX={electron.xDisplace}
                  offsetY={electron.yDisplace}
                  radius={5}
                  fill={fromShapeId === electron.id ? "red" : "black"}
                  onClick={(e) => {
                    setMessage("");
                    if (fromShapeId) {
                      const prevElectron = getElectronById(fromShapeId[0]);
                      const thisElectron = getElectronById(electron.id);
                      bondElectrons(
                        [prevElectron, thisElectron],
                        e,
                        fromShapeId[1]
                      );
                      setFromShapeId(null);
                      // const newConnector = {
                      //   from: fromShapeId,
                      //   to: electron.id
                      // }
                    } else {
                      setFromShapeId([electron.id, e]);
                    }
                  }}
                  // onClick={connectLine}
                />
              ))}

              <Text offsetX={10} offsetY={10} text={atom.text} fontSize={30} />
            </Group>
          ))}
          {/* {connectors.map((con) => (
            <Line
              onClick={(e) => {
                console.log(e);
                console.log(e.target.attrs.points);
                e.target.attrs.points = [];
                console.log(e.target.attrs.points);
                // breakBonds(con[0]);
              }}
              points={con}
              stroke="red"
              strokeWidth={4}
            />
          ))} */}
          {lineData.map((entry) => (
            <Line
              points={returnPointsUsingElectronIds(entry)}
              stroke="red"
              stroke-weight={3}
            />
          ))}
        </Layer>
      </Stage>
      {/* <button onClick={updateMolecule}> Next Molecule </button> */}
    </main>
  );
}

export default App;
