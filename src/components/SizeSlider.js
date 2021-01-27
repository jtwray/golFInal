import React from "react";
import {
  Slider,
  SliderTrack,
  SliderThumb,
  Box,
  SliderFilledTrack
} from "@chakra-ui/react";
import { Alert, MdGraphicEq } from "react-icons";
import ToolTip from "./ToolTip";
export default function SizeSlider({ setSize }) {
  // const toast = useToast();

  const handleChangeSize = (newValue) => {
    setSize(newValue);
  };

  return (
    <>
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

            fontWeight: "500",
            flex: "0 2 45%"
          }}
          htmlFor="speedSlider"
        >
          Size
        </label>

        <ToolTip
          // style={{ flex: "0 2 45%" }}
          message={
            "Cells Per Row.\n   FUNFACT Because the grid is a perfect square Total Population = Cells Per Row Squared."
          }
          iconFontSize={"2.0rem"}
          placement={"left"}
          icon={Alert}
          messageFontSize={"2.5rem"}
        />
      </div>
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
            setSize(value);
          }}
          id="speedSlider"
          defaultValue={30}
          min={5}
          max={40}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box color="tomato" as={MdGraphicEq} />
          </SliderThumb>
        </Slider>
      </div>
    </>
  );
}
