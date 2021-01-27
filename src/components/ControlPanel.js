import React from "react";
import { ButtonGroup, Spacer, Button, HStack } from "@chakra-ui/react";

import SpeedSlider from "./SpeedSlider";
import SizeSlider from "./SizeSlider";

export default function ControlPanel({
  toggleStart,
  isRunning,
  random,
  clear,
  step,
  generation,
  rowLen,
  gridSIZE,
  delay,
  dispatch,
  setSpeed,
  setSize
}) {
  return (
    <>
      <HStack
        display="flex"
        w="80vw"
        border="outset 5px indigo"
        height="auto"
        p="3"
        boxShadow="1px 1px 15px grey"
        background="darkgrey"
      >
        <ButtonGroup
          flex="1 4 25%"
          background="snow"
          boxShadow="inset 1px 1px 10px grey"
          margin="0 auto"
          alignItems="center"
          border="groove silver 5px"
          borderRadius="10px"
          display="flex"
          w="200px"
          h="200px"
          justifyContent="space-evenly"
          color="rgb(24,24,24)"
          fontSize="36px"
          flexWrap="wrap"
        >
          <Button
            borderRadius="10px"
            width="44%"
            height="45%"
            border="double 4px silver"
            boxShadow="1px 1px 10px grey,2px 3px 0px indigo"
            fontSize="1.6rem"
            transition="all .4s ease"
            onClick={toggleStart}
          >
            {isRunning ? "STOP" : "START"}
          </Button>
          <Button
            width="44%"
            height="45%"
            border="double 4px silver"
            boxShadow="1px 1px 10px grey,2px 3px 0px indigo"
            fontSize="1.4rem"
            transition="all .4s ease"
            onClick={random}
          >
            RANDOM
          </Button>
          <Button
            width="44%"
            height="45%"
            border="double 4px silver"
            boxShadow="1px 1px 10px grey,2px 3px 0px indigo"
            fontSize="1.6rem"
            transition="all .4s ease"
            onClick={clear}
          >
            CLEAR
          </Button>
          <Button
            width="44%"
            height="45%"
            border="double 4px silver"
            boxShadow="1px 1px 10px grey,2px 3px 0px indigo"
            fontSize="1.6rem"
            transition="all .4s ease"
            onClick={step}
          >
            STEP
          </Button>
        </ButtonGroup>
        <Spacer />

        <section
          id="controlPanelBox_Slides_Data"
          style={{
            flex: "3 4 74%",
            fontSize: "4rem",
            height: "200px",
            width: "80%",
            display: "flex",
            borderRadius: "3px",
            border: "groove 5px silver",
            placeContent: "space-between"
          }}
        >
          <div
            className="controlPanelSubBox_Slides"
            style={{
              flex: "4 10 40%",
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
              border: "inset silver 5px"
            }}
          >
            <SizeSlider delay={delay} setSize={setSize} />
            <Spacer />
            <SpeedSlider delay={delay} setSpeed={setSpeed} />
          </div>
          <div
            className="controlPanelSubBox_Labels"
            style={{
              flex: "2 10 20%",
              display: "flex",
              flexDirection: "column",
              placeContent: "center",
              justifyContent: "space-evenly",
              padding: ".1rem .4rem",
              fontSize: "3.6rem",
              border: "inset silver 5px",
              borderRadius: "10px",
              color: "silver",
              textShadow: "1px 1px 1px white, -1px -1px 1px black",
              boxShadow: "inset -1px -19px 70px 35px indigo"
            }}
          >
            <label htmlFor="generation">generation</label>
            <label htmlFor="cells-per-row">cells / row</label>
            <label htmlFor="totalCells">Population</label>
            <label htmlFor="delay">Life Span</label>
          </div>
          <div
            className="controlPanelSubBox_Data"
            style={{
              flex: "1 10 10%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "indigo",
              justifyContent: "space-evenly",
              fontSize: "3.6rem",
              color: "snow",
              textShadow: `1px 1px 1px white,
                -1px -1px 1px black
                `,
              border: "inset silver 5px",
              borderRadius: "10px"
            }}
          >
            <div id="generation">{generation}</div>
            <div id="cells-per-row">{rowLen}</div>
            <div id="totalCells">{gridSIZE}</div>
            <div id="delay">{delay}ms</div>
          </div>
        </section>
      </HStack>
    </>
  );
}
