import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import FloodMap from "./FloodMap";
import "./ScrollBody.css";

export default function ScrollBody() {
  
  const [data, setData] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [10, 20, 30,40,50];

  const onStepEnter = (e) => {
    const { data, entry, direction } = e;
    setData(data);
  };

  const onStepExit = ({ direction, data }) => {
    if (direction === "up" && data === steps[0]) {
      setData(0);
    }
  };

  const onStepProgress = ({ progress }) => {
    setProgress(progress);
  };

  return (
    <div className={"graphicContainer"}>
      <div className={"map"}>
        <FloodMap />
      </div>
      <div className={"scroller"}>
        <Scrollama
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          progress
          onStepProgress={onStepProgress}
          offset="400px"
          debug
        >
          {steps.map((value) => {
            const isVisible = value === data;
            const background = isVisible
              ? `rgba(44,127,184, ${progress})`
              : "white";
            const visibility = isVisible ? "visible" : "hidden";
            return (
              <Step data={value} key={value}>
                <div className={"step"} style={{ background }}>
                  <p>step value: {value}</p>
                  <p style={{ visibility }}>
                    {Math.round(progress * 1000) / 10 + "%"}
                  </p>
                </div>
              </Step>
            );
          })}
        </Scrollama>
      </div>
    </div>
  );
}
