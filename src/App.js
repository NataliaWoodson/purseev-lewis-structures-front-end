import "./App.css";
import { Stage, Layer, Text, Circle, Group, Line } from "react-konva";
import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import MolecFormula from "./components/MolecFormula";
import DisplayProgress2 from "./components/DisplayProgress2";
import UserMessages from "./components/UserMessages";
import Buttons from "./components/Buttons";
import {
  numElectronsObj,
  electronPositionDisplacements,
} from "./components/constants";
import {
  getMolecules,
  generateNumAtomsDict,
  molecFormulaInit,
} from "./components/initializeGame";

const STATE = {
  ids: 0,
  numRounds: 0,
  submitClicked: false,
  message: "",
};

const getElectronDataArray = (numElectrons, atomId, xAtom, yAtom) => {
  const nums = [...Array(numElectrons + 1).keys()];
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
};

function App() {
  const [fromShapeId, setFromShapeId] = React.useState(null);
  const [electrons, setElectrons] = React.useState(null);
  const [atoms, setAtoms] = useState([]);
  const [message, setMessage] = useState("Startup message.");
  const [submissions, setSubmissions] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [lineData, setLineData] = useState([]);
  const [molecFormula, setMolecFormula] = useState("");

  const getElectronsArray = useCallback(() => {
    let electronList = [];
    for (let atom of atoms) {
      electronList.push(...atom.electrons);
    }

    setElectrons(electronList);
  }, [atoms]);

  const updateElectronsArray = useCallback(
    (updatedElectronsArray) => {
      const getUpdatedElectronIds = () => {
        let updatedIds = [];
        for (let passedElectron of updatedElectronsArray) {
          updatedIds.push(passedElectron.id);
        }
        console.log(
          "extracted electron ids in updateElectronsArray are",
          updatedIds
        );
        return updatedIds;
      };

      const updatedElectronIds = getUpdatedElectronIds();
      let electronList = [];
      for (let electron of electrons) {
        if (updatedElectronIds.includes(electron.id)) {
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
          electronList.push(electron);
        }
      }
      setElectrons(electronList);
    },
    [electrons]
  );

  const updateOneAtomPositionState = useCallback(
    (selectedAtomId, updatedAtomX, updatedAtomY) => {
      const newElectronData = getUpdatedElectronsInOneAtomState(selectedAtomId);
      console.log("newElectronData are", newElectronData);
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
      setAtoms(updatedAtomData);
    },
    [atoms]
  );

  const getAtomPositionById = (atomId) => {
    for (let atom of atoms) {
      if (atom.id === atomId) {
        return [atom.x, atom.y];
      }
    }
  };

  const getUpdatedElectronsInOneAtomState = (atomId) => {
    // let updatedElectronAtomIds = [];
    // for (let newElectron of electronsArray) {
    //   updatedElectronAtomIds.push(newElectron.atomId)
    // }

    let updatedElectronsArray = [];

    for (let electron of electrons) {
      if (electron.atomId === atomId) {
        updatedElectronsArray.push(electron);
      }
    }

    return updatedElectronsArray;

    // for (let atom of atoms) {
    //   if (atom.id === atomId) {

    //   }
    // }
  };

  const bondElectrons = (
    electronsArray,
    firstElectronEvent,
    secondElectronEvent
  ) => {
    const atomIds = [];
    for (let checkElectron of electronsArray) {
      atomIds.push(checkElectron.atomId);
      if (checkElectron.isPaired === true) {
        setMessage(
          "Invalid bond. You can only form a bond between two electrons if they are both unpaired."
        );
        setFromShapeId(null);
        return null;
      }
    }
    // check if electron is being bonded to electron on same atom
    const atomIdsSet = new Set(atomIds);
    if (atomIds.length !== atomIdsSet.size) {
      setMessage("Invalid bond. Cannot bond electrons in the same atom.");
      setFromShapeId(null);
      return null;
    }

    setMessage("That was a valid bond.");
    console.log("valid bond");

    const updatedElectronData = [];
    const newElectronConnecterData = [];

    for (let selectedElectron of electronsArray) {
      updatedElectronData.push({
        id: selectedElectron.id,
        isPaired: true,
        xDisplace: selectedElectron.displace,
        yDisplace: selectedElectron.yDisplace,
        x: selectedElectron.x,
        y: selectedElectron.y,
        atomId: selectedElectron.atomId,
      });
    }
    updateElectronsArray(updatedElectronData);

    for (let chosenElectron of electronsArray) {
      newElectronConnecterData.push(chosenElectron.id);
    }
    setLineData((current) => [...current, newElectronConnecterData]);
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
    setLineData([]);
    setGameStarted(true);

    if (submissions.length > 5) {
      return null;
    }
    setMessage("");
    STATE.numRounds++;

    setSubmitClicked(false);

    if (STATE.numRounds <= 5) {
      getMolecules().then((chemicalFormula) => {
        const atomObj = generateNumAtomsDict(chemicalFormula);
        setAtoms(generateAtoms(atomObj));
      });
      STATE.ids = 0;
    } else {
      console.log("played five rounds");
    }
    // setLevelInfo(STATE.submissions.score);
    console.log(STATE.submissions.score);
  }, []);

  useEffect(() => {
    setGameStarted(false);
    STATE.ids = 0;
  }, []);

  useEffect(() => {
    getElectronsArray();
  }, [getElectronsArray]);

  const updateSubmissions = (result) => {
    if (submissions.length === 5) {
      console.log("Game completed. Start new game.");
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

    return submissions;
  };

  const verifyStructureValidity = () => {
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

    setMessage("Great job! This structure is correct!");
    updateSubmissions(true);
    return true;
  };

  const resetGame = () => {
    setSubmissions([]);
    setLineData([]);
    setGameStarted(false);
    STATE.numRounds = 0;
    updateMolecule();
  };

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
      atom1x - electron1offsetX,
      atom1y - electron1offsetY,
      atom2x - electron2offsetX,
      atom2y - electron2offsetY,
    ];

    console.log("points are", points);
    return points;
  };

  const updateAtomPosition = (e) => {
    const selectedAtomId = parseInt(e.target.attrs.id);
    const deltaX = e.target.attrs.x;
    const deltaY = e.target.attrs.y;

    for (let atom of atoms) {
      if (atom.id === selectedAtomId) {
        updateOneAtomPositionState(selectedAtomId, deltaX, deltaY);
      }
    }
  };

  return (
    <main>
      <Header />
      <DisplayProgress2 />
      <MolecFormula display={molecFormula} />
      <UserMessages message={message} />
      <Buttons
        updateMoleculeApp={updateMolecule}
        verifyStructureValidityApp={verifyStructureValidity}
        submissionsApp={submissions}
        submitClickedApp={submitClicked}
        resetGameApp={resetGame}
        gameStartedApp={gameStarted}
      />
      <Stage id={"stage"} width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {atoms.map((atom) => (
            <Group
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
                    } else {
                      setFromShapeId([electron.id, e]);
                    }
                  }}
                />
              ))}
              <Text offsetX={10} offsetY={10} text={atom.text} fontSize={30} />
            </Group>
          ))}
          {lineData.map((entry) => (
            <Line
              points={returnPointsUsingElectronIds(entry)}
              stroke="red"
              stroke-weight={3}
            />
          ))}
        </Layer>
      </Stage>
    </main>
  );
}

export default App;
