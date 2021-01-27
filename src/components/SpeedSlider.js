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
import { MdGraphicEq, Alert } from "react-icons";
import ToolTip from "./ToolTip";
export default function SpeedSlider({ setSpeed, delay }) {
  const toast = useToast();

  const [prevDelay, setPrevDelay] = useState(delay);

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
          }}
          id="speedSlider"
          defaultValue={30}
          min={1}
          max={2000}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" as={MdGraphicEq} />
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
            fontSize: "3.5rem",
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
          icon={Alert}
          messageFontSize={"2.5rem"}
        />
      </div>
    </>
  );
}
