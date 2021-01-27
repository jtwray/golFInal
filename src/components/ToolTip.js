import React from "react";
import { Tooltip, Icon } from "@chakra-ui/react";

export default function ToolTip(props) {
  return (
    <div style={{ textShadow: "1px 1px 0px  black,-1px -1px 0px white" }}>
      <Tooltip
        label={props.message}
        fontSize={props.messageFontSize}
        textShadow="1px 1px 0px silver, -1px -1px 0px midnightblue"
        borderRadius="10px"
        border="outset midnightblue .5rem"
        placement={props.placement}
        m="20px"
      >
        <Icon
          cursor="pointer"
          fontSize={props.iconFontSize}
          color="midnightblue"
          as={props.icon}
        />
      </Tooltip>
    </div>
  );
}
