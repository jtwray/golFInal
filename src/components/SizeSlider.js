import React from "react";
import {
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack
} from "@chakra-ui/react";
import ToolTip from "./ToolTip";
export default function SizeSlider({ rowLen, setSize }) {
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
            fontSize: "2rem",
            textShadow: "-1px -1px 1px black,1px 1px 1px white",

            fontWeight: "500",
            flex: "0 2 45%"
          }}
          htmlFor="sizeSlider"
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
          onChange={setSize}
          id="sizeSlider"
          value={rowLen}
          min={5}
          max={40}
          title={rowLen}
          aria-label="Cells per row"
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} fontSize={"1.2rem"}>
            <span aria-hidden="true">
              🔘
            </span>
          </SliderThumb>
        </Slider>
      </div>
    </>
  );
}
