import React, { useState, useEffect } from "react";
import { Text, Layer } from "react-konva";
import PropTypes from "prop-types";
import "../Atom.css";
import ElementSymbol from "./ElementSymbol";
import Electron from "./Electron";

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

const pixelsDisplacement = 40;
const pixelsLonePairShift = 20;

const electronPositions = {
  1: {
    1: {
      x: 0,
      y: pixelsDisplacement,
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

const Atom = (props) => {
  const atomPosition = {
    x: 100,
    y: 100,
  };

  const elementSymbol = props.elementSymbolApp;

  const electronsJSX = (elementSymbol) => {
    const numElectrons = numElectronsObj.elementSymbol;
    const nums = Array.from({ length: numElectrons }, (_, i) => i + 1); // gets array from 1 - numElectrons inclusive
    const electronsDataArray = [];

    for (let num of nums) {
      const xDisplace = electronPositions.numElectrons.num.x;
      const yDisplace = electronPositions.numElectrons.num.y;
      const entry = {
        electronId: num,
        x: atomPosition.x + xDisplace,
        y: atomPosition.y + yDisplace,
      };
      electronsDataArray.push(entry);
    }

    const getElectronDataJSX = electronsDataArray.map((electron) => {
      return <Electron id={electron.id} x={electron.x} y={electron.y} />;
    });
    return <div>{getElectronDataJSX}</div>;
  };

  return (
    <div>
      <ElementSymbol elementSymbolAtom={elementSymbol} />
      {electronsJSX}
    </div>
  );
};

export default Atom;
