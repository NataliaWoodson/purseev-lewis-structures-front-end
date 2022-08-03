import React from "react";
import { Circle } from "react-konva";

const Electron = (props) => {
  // console.log(props);
  const x = props.x;
  const y = props.y;

  return (
    <Circle
      key={1}
      id={"1"}
      x={100}
      y={100}
      numPoints={5}
      radius={10}
      fill="#89b717"
      opacity={0.8}
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.6}
      draggable={true}
    />
  );
};

export default Electron;
