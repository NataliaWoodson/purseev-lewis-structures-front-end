import "./AppContent.css";
// import "../App.css";
import { Stage, Layer, Text, Circle, Group, Line } from "react-konva";
import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import MolecFormula from "./MolecFormula";
import DisplayProgress2 from "./DisplayProgress2";
import UserMessages from "./UserMessages";
// import { Link } from "react-router-dom";
import Buttons from "./Buttons";
import { numElectronsObj, electronPositionDisplacements } from "./constants";
import PopUp from "./PopUp";
import PeriodicPopup from "./PeriodicPopup";
import { FaUndo } from "react-icons/fa";
import { BsInfoSquare } from "react-icons/bs";

import {
  getMolecules,
  generateNumAtomsDict,
  molecFormulaInit,
} from "./initializeGame";

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
  // console.log("atomData in generateAtoms is", atomData);
  return atomData;
};

function AppContent() {
  const [fromShapeId, setFromShapeId] = React.useState(null);
  const [electrons, setElectrons] = React.useState(null);
  const [atoms, setAtoms] = useState([]);
  const [message, setMessage] = useState("Click Start Game button to begin!");
  const [submissions, setSubmissions] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [lineData, setLineData] = useState([]);
  const [molecFormula, setMolecFormula] = useState("");
  const [resetClicked, setResetClicked] = useState(false);
  const [seen, setSeen] = useState(false);
  const [tablePopup, settablePopup] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [touchingTarget, setTouchingTarget] = useState(false);
  const [points, setPoints] = useState(null);
  // const [clicked, setClicked] = useState(false);

  const getElectronsArray = useCallback(() => {
    // Only continues to next part if there aren't already electrons in the electron state.
    if (electrons && electrons.length) {
      if (!resetClicked) {
        return;
      } else {
        let electronList = [];
        for (let atom of atoms) {
          electronList.push(
            ...atom.electrons.map((electron) => {
              return { ...electron };
            })
          );
        }
        setResetClicked(false);
      }
    }

    // Generates electrons in electron state from electron arrays in atoms.
    let electronList = [];
    for (let atom of atoms) {
      electronList.push(
        ...atom.electrons.map((electron) => {
          return { ...electron };
        })
      );
    }

    setElectrons(electronList);
  }, [atoms, resetClicked]);

  const updateElectronsArray = useCallback(
    (updatedElectronsArray) => {
      console.log("updatingElectronsArray.");
      console.log("updateDelectronsArray is", updatedElectronsArray);
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

      for (const updatedElectron of electronList) {
      }
    },
    [electrons]
  );

  const updateOneAtomPositionState = useCallback(
    (selectedAtomId, updatedAtomX, updatedAtomY) => {
      // const newElectronData = getUpdatedElectronsInOneAtomState(selectedAtomId);
      // console.log("newElectronData are", newElectronData);
      const updatedAtomData = [];
      for (let atom of atoms) {
        if (atom.id === selectedAtomId) {
          updatedAtomData.push({
            id: atom.id,
            x: updatedAtomX,
            y: updatedAtomY,
            text: atom.text,
            isDragging: true,
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

  const getAtomById = (atomId) => {
    for (const atom of atoms) {
      if (atom.id === atomId) {
        return atom;
      }
    }
  };

  const bondElectrons = (
    electronsArray,
    firstElectronEvent,
    secondElectronEvent
  ) => {
    const atomIds = [];
    // check if electron is already paired
    for (const checkElectron of electronsArray) {
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
    // check for bonds between invalid atoms if more than two atoms in molecule
    const invalidBonds = ["H", "F", "Cl"];
    const atom1Id = atomIds[0];
    const atom2Id = atomIds[1];
    const atom1 = getAtomById(atom1Id);
    const atom2 = getAtomById(atom2Id);
    if (atoms.length > 2) {
      if (
        invalidBonds.includes(atom1.text) &&
        invalidBonds.includes(atom2.text)
      ) {
        setMessage(
          "Invalid bond. If you bond these atoms together you will not be able to bond all atoms into one molecule."
        );
        return;
      }
    }

    setMessage("That was a valid bond.");
    console.log("valid bond");

    const updatedElectronData = [];
    const newElectronConnecterData = [];

    for (let selectedElectron of electronsArray) {
      updatedElectronData.push({
        id: selectedElectron.id,
        isPaired: true,
        xDisplace: selectedElectron.xDisplace,
        yDisplace: selectedElectron.yDisplace,
        x: selectedElectron.x,
        y: selectedElectron.y,
        atomId: selectedElectron.atomId,
      });
    }

    for (let chosenElectron of electronsArray) {
      newElectronConnecterData.push(chosenElectron.id);
    }
    setLineData((current) => [...current, newElectronConnecterData]);
    updateElectronsArray(updatedElectronData);
  };

  // To be used as a helper function once we have a record of the connectors and their corresponding electrons.
  const breakBonds = (electronIdArray) => {
    const updatedLineData = [];
    for (const entry of lineData) {
      if (entry !== electronIdArray) {
        updatedLineData.push(entry);
      }
    }
    setLineData(updatedLineData);

    const electronsArray = [];
    for (const electronId of electronIdArray) {
      electronsArray.push(getElectronById(electronId));
    }
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
    setElectrons(null);
    setFromShapeId(null);
    if (submissions.length > 5) {
      return null;
    }
    setMessage(
      "Click two unpaired electrons to draw bonds until they're all bonded. Click a bond to delete it."
    );
    STATE.numRounds++;

    setSubmitClicked(false);

    if (STATE.numRounds <= 5) {
      getMolecules().then((chemicalFormula) => {
        setMolecFormula(chemicalFormula);
        const atomObj = generateNumAtomsDict(chemicalFormula);
        setAtoms(generateAtoms(atomObj));
      });
      STATE.ids = 0;
    } else {
      console.log("played five rounds");
    }
    // setLevelInfo(STATE.submissions.score);
    // console.log(STATE.submissions.score);
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
          "This structure is invalid. Try to find a way to bond electrons so that every single one is paired."
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

  // const handleDragStart = (e) => {
  //   let id = e.target.id();
  //   id = parseInt(id);
  //   setAtoms(
  //     atoms.map((atom) => {
  //       return {
  //         ...atom,
  //         isDragging: atom.id === id,
  //       };
  //     })
  //   );
  // };
  // const handleDragEnd = (e) => {
  //   setAtoms(
  //     atoms.map((atom) => {
  //       return {
  //         ...atom,
  //         isDragging: false,
  //       };
  //     })
  //   );

  const resetGame = () => {
    setSubmissions([]);
    setLineData([]);
    setGameStarted(false);
    STATE.numRounds = 0;
    updateMolecule();
  };

  const returnPointsUsingElectronIds = (entry) => {
    const electronId1 = entry[0];
    const electronId2 = entry[1];
    const electron1 = getElectronById(electronId1);
    const electron2 = getElectronById(electronId2);

    const atomId1 = electron1.atomId;
    const atomId2 = electron2.atomId;

    const atom1x = getAtomPositionById(atomId1)[0];
    const atom1y = getAtomPositionById(atomId1)[1];

    const atom2x = getAtomPositionById(atomId2)[0];
    const atom2y = getAtomPositionById(atomId2)[1];

    const electron1offsetX = electron1.xDisplace;
    const electron1offsetY = electron1.yDisplace;

    const electron2offsetX = electron2.xDisplace;
    const electron2offsetY = electron2.yDisplace;

    const points = [
      atom1x - electron1offsetX,
      atom1y - electron1offsetY,
      atom2x - electron2offsetX,
      atom2y - electron2offsetY,
    ];

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

  const resetBonds = () => {
    setResetClicked(true);
    setLineData([]);
    getElectronsArray();
  };

  const handleDragEnd = (e) => {
    setAtoms(
      atoms.map((atom) => {
        return {
          ...atom,
          isDragging: false,
        };
      })
    );
  };

  const hoverElectron = (e) => {
    e.target.fill("yellow");
  };

  const unhoverElectron = (e) => {
    e.target.fill(chooseElectronFill(e.target.attrs.id));
  };

  const chooseElectronFill = (electron) => {
    if (fromShapeId) {
      if (fromShapeId[0] === electron.id) {
        return "yellow";
      } else {
        return "black";
      }
    } else {
      return "black";
    }
  };

  const togglePop = () => {
    setSeen((seen) => !seen);
  };

  const togglePeriodicPopup = () => {
    settablePopup((tablePopup) => !tablePopup);
  };

  const handleMoveMouse = (e) => {
    const cursor = e.currentTarget.getPointerPosition();
    const currentPoint = points;
    const updatedPoint = [currentPoint[0], currentPoint[1], cursor.x, cursor.y];
    setPoints(updatedPoint);
  };

  const removeLastPoint = () => {
    setPoints(null);
    const updatedLineData = lineData.slice(0, -1);
    setLineData(updatedLineData);
  };

  const handleSetLineData = (electronId) => {
    const finalElectronIdPair = lineData.pop();
    finalElectronIdPair.push(electronId);
    const updatedLineData = [];
    if (lineData.length === 0) {
      setLineData(updatedLineData);
      return;
    }
    for (let i = 0; i < lineData.length; i++) {
      updatedLineData.push(lineData[i]);
      console.log("i is", i, ". updatedLineData is", updatedLineData);
    }
    setLineData(updatedLineData);
    setPoints(null);
  };

  const handleClickFirstTarget = (e) => {
    console.log("in handleClickFirst, drawing is", drawing);
    const electron = getElectronById(parseInt(e.target.attrs.id));
    const atomId = electron.atomId;
    const position = getAtomPositionById(atomId);
    const xPos = position[0] - electron.xDisplace;
    const yPos = position[1] - electron.yDisplace;
    setPoints([xPos, yPos, xPos, yPos]);
    setLineData((current) => [...current, [electron.id]]);
  };

  const choosePointsSource = (entry) => {
    if (entry.length === 1) {
      return points;
    } else {
      return returnPointsUsingElectronIds(entry);
    }
  };

  const selectListening = () => {
    if (drawing) {
      return false;
    } else {
      return true;
    }
  };
  // set atom colors
  const setAtomColor = (atomSymbol) => {
    if (atomSymbol === "H") {
      return "white";
    } else if (atomSymbol === "O") {
      return "#ff3333";
    } else if (atomSymbol === "Cl" || atomSymbol === "F") {
      return "#50C878";
    } else if (atomSymbol === "N") {
      return "#3385ff";
    } else if (atomSymbol === "C" || atomSymbol === "Si") {
      return "#808080";
    } else if (atomSymbol === "S") {
      return "yellow";
    } else if (atomSymbol === "P") {
      return "orange";
    } else if (atomSymbol === "B") {
      return "#c266ff";
    } else if (atomSymbol === "Br") {
      return "#A62929";
    }
  };

  const setAtomRadius = (text) => {
    if (text === "H") {
      return 40;
    } else {
      return 46;
    }
  };

  return (
    <main className="window-comp">
      <section className="Main-container">
        <Header />
        <div className="Left-comp">
          <MolecFormula display={molecFormula} />
          <ul className="short-directions">
            <h3>How to Play</h3>
            <li>- Click two unpaired electrons to draw a bond.</li>
            <li>- Click a bond to delete it.</li>
            <li>- Keep going until all unpaired electrons are bonded!</li>
          </ul>
          <DisplayProgress2
            updateMoleculeApp={updateMolecule}
            verifyStructureValidityApp={verifyStructureValidity}
            submissionsApp={submissions}
            submitClickedApp={submitClicked}
            setSubmitClickedApp={setSubmitClicked}
            resetGameApp={resetGame}
            gameStartedApp={gameStarted}
          />
        </div>
        <div className="Right-comp">
          <div className="main-stage-container">
            <h1 className="stage-header">Lewis Structures</h1>
            <div className="stage-container">
              <div className="popUpContainer">
                <button
                  onClick={togglePeriodicPopup}
                  className="periodic-button"
                >
                  Periodic Table
                </button>
                <button onClick={togglePop} className="instructions">
                  <BsInfoSquare />
                </button>
              </div>
              <div className="stage-msg">
                <UserMessages message={message} />
              </div>

              <div className="reset-container">
                <button className="reset-button" onClick={resetBonds}>
                  <FaUndo />
                </button>
                {seen ? <PopUp toggle={togglePop} /> : null}
                {tablePopup ? (
                  <PeriodicPopup toggle={togglePeriodicPopup} />
                ) : null}
              </div>

              <Stage
                id={"stage"}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseMove={(e) => {
                  if (drawing) {
                    handleMoveMouse(e);
                  }
                }}
                onMouseUp={() => {
                  if (!drawing) {
                    return;
                  }
                  if (!touchingTarget) {
                    setDrawing(false);
                    removeLastPoint();
                    setFromShapeId(null);
                  }
                }}
              >
                <Layer>
                  {atoms.map((atom) => (
                    <Group
                      id={atom.id.toString()}
                      draggable={!touchingTarget}
                      x={atom.x}
                      y={atom.y}
                      onDragMove={(e) => {
                        updateAtomPosition(e);
                      }}
                      onDragEnd={handleDragEnd}
                    >
                      <Circle
                        key={atom.id}
                        x={0}
                        y={0}
                        // fill="#72D6C9"
                        fill={setAtomColor(atom.text)}
                        radius={setAtomRadius(atom.text)}
                        opacity={0.7}
                        // shadowColor="black"
                        shadowBlur={10}
                        shadowOpacity={0.7}
                        shadowOffsetX={atom.isDragging ? 8 : 5}
                        shadowOffsetY={atom.isDragging ? 8 : 5}
                        scaleX={atom.isDragging ? 1.1 : 1}
                        scaleY={atom.isDragging ? 1.1 : 1}
                      ></Circle>
                      {atom.electrons.map((electron) => (
                        <Circle
                          key={electron.id}
                          id={electron.id.toString()}
                          offsetX={electron.xDisplace}
                          offsetY={electron.yDisplace}
                          radius={5}
                          onClick={(e) => {
                            setMessage(
                              "Click two unpaired electrons to draw bonds until they're all bonded. Click a bond to delete it."
                            );
                          }}
                          fill={"black"}
                          onMouseOver={(e) => {
                            e.target.fill("yellow");
                            setTouchingTarget(true);
                          }}
                          onMouseOut={(e) => {
                            e.target.fill("black");
                            setTouchingTarget(false);
                          }}
                          onMouseDown={(e) => {
                            setFromShapeId([electron.id, e]);
                            setDrawing(true);
                            handleClickFirstTarget(e);
                          }}
                          onMouseUp={(e) => {
                            setDrawing(false);
                            if (fromShapeId) {
                              const prevElectron = getElectronById(
                                fromShapeId[0]
                              );
                              const thisElectron = getElectronById(electron.id);
                              handleSetLineData(electron.id);
                              bondElectrons(
                                [prevElectron, thisElectron],
                                e,
                                fromShapeId[1]
                              );
                              setFromShapeId(null);
                            }
                          }}
                        />
                      ))}
                      <Text
                        offsetX={10}
                        offsetY={10}
                        text={atom.text}
                        fontSize={30}
                      />
                    </Group>
                  ))}
                  {lineData.map((entry) => (
                    // Dragged Line
                    <Line
                      id={entry}
                      listening={selectListening()}
                      strokeWidth={7}
                      stroke="black"
                      points={choosePointsSource(entry)}
                      onClick={(e) => {
                        console.log("line clicked");
                        console.log(e.target.attrs.id);
                        breakBonds(e.target.attrs.id);
                      }}
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AppContent;
