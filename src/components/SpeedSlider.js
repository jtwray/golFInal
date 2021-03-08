import React, { useEffect, useState, useRef } from "react";
import {
  Slider,
  SliderTrack,
  SliderThumb,
  Box,
  SliderFilledTrack,
  Icon,
  useToast
} from "@chakra-ui/react";
import ToolTip from "./ToolTip";
export default function SpeedSlider({ setSpeed, delay }) {
  const toast = useToast();

  const [prevDelay, setPrevDelay] = useState(delay);
  const [titleValue, setTitleValue] = React.useState(6);
  const handleChangeDelay = (newValue) => {
    setSpeed(newValue);
    setPrevDelay(newValue);

    if (prevDelay < newValue) {
      toast({
        position: "bottom-left",
        title: "Speed Changed",
        description: `Speed increased by ${
          newValue - prevDelay
        }. Delay set to ${newValue}`,
        status: "success",
        duration: 900,
        isClosable: true
      });
    } else if (prevDelay > newValue) {
      toast({
        position: "bottom-left",
        size: "14rem",
        title: "Speed Changed",
        description: `Speed decreased by ${
          prevDelay - newValue
        }. Delay set to ${newValue}`,
        status: "success",
        duration: 900,
        isClosable: true
      });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          border: "inset silver .5rem",
          boxShadow: "inset 0 1px 50px 0px white",
          color: "darkgrey",
          backgroundColor: "indigo"
        }}
      >
        <Slider
          onChange={(value) => {
            handleChangeDelay(value);
            setTitleValue(value);
          }}
          id="speedSlider"
          defaultValue={30}
          min={6}
          max={2000}
          title={titleValue}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} fontSize={"1.2rem"}>
            🔘
          </SliderThumb>
        </Slider>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        <label
          style={{
            fontSize: "2rem",
            textShadow: "-1px -1px 1px black,1px 1px 1px white",
            flex: "0 2 45%",
            fontWeight: "500"
          }}
          htmlFor="speedSlider"
        >
          Speed
        </label>
        <ToolTip
          message={
            "Cell LifeSpan\n Seconds Per Generation. | Increasing this setting slows the grid animation."
          }
          iconFontSize={"2.0rem"}
          placement={"right"}
          messageFontSize={"2.5rem"}
        />
      </div>
    </>
  );
}
