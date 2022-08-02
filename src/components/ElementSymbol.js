import React from "react";
import { Text } from "react-konva";

const ElementSymbol = (props) => {
  // console.log("element symbol props are", props);
  const elementSymbol = props.elementSymbolAtom;
  // console.log(elementSymbol);
  // return <Text text={elementSymbol} />;
  return <h1>{elementSymbol}</h1>;
};

export default ElementSymbol;

// Code to draw lines between components in different layers / stages?
// How can we connect multiple components?
// How do we interact with lines after they are drawn?
