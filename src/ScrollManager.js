import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import FloodMap from "./FloodMap";
import "./ScrollManager.css";

export default function ScrollManager({steps}) {
  
  const [mapState, setmapState] = useState(steps[0].mapState);

  // Scrollama stuff 
  const onStepEnter = (e) => {
    const { data, entry, direction } = e;
    setmapState(steps[data].mapState);
  };

  return (
    <div className={"mapScrollerContainer"}>
      <div className={"map"}>
        <FloodMap
          mapState={{...mapState}}
          onViewStateChange={(viewState) =>
            setmapState({ ...mapState, viewState })
          }
        />
      </div>
      <div className={"scroller"}>
        <Scrollama onStepEnter={onStepEnter} offset="400px">
          {steps.map((step) => {
            return (
              <Step key={step.id} data={step.id}>
                <div className={"step"}>
                  <h1>{step.text.header}</h1>
                  <p>{step.text.body}</p>
                </div>
              </Step>
            );
          })}
        </Scrollama>
      </div>
    </div>
  );
}
