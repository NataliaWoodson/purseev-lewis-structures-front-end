import React, { useEffect } from "react";
import { useState } from "react";
import "./DisplayProgress2.css";
// import Konva from "konva";

const DisplayProgress2 = () => {
  const [circle] = useState(6);
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);

  const Circle = ({ classname, children }) => {
    return <div className={classname}>{children}</div>;
    // return <div className="circle">{1}</div>;
  };

  useEffect(() => {
    setWidth((100 / (circle - 1)) * active);
  }, [circle, active]);
  const arr = [];
  for (let i = 1; i < circle; i++) {
    arr.push(
      <Circle classname={i <= active ? "circle active" : "circle"} key={i}>
        {i}
      </Circle>
    );
  }
  return (
    <div className="container">
      <div className="content">
        <div className="progressbar">
          <div className="progress" style={{ width: width + "%" }}></div>
          {arr}
        </div>
        <div className="button">
          <button
            className="prev btn"
            disabled={active > 1 ? false : true}
            onClick={() => {
              active <= 0 ? setActive(0) : setActive(active - 1);
            }}
          >
            Prev
          </button>
          <button
            className="next btn"
            disabled={active >= circle - 1 ? true : false}
            onClick={() => {
              active > circle ? setActive(circle) : setActive(active + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayProgress2;
