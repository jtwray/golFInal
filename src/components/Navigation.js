import React from "react";
import {
  Flex,
  Box,
  Spacer,
  useMenu,
  Menu,
  MenuItem,
  MenuIcon,
  MenuGroup,
  MenuButton
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { navStyles } from "../utils/styles";
import { ColorModeSwitcher } from "../utils/ColorModeSwitcher";

export default function Navigation() {
  return (
    <Flex style={navStyles}>
      <NavLink to="/game">Game</NavLink>

      <NavLink to="/rules">Rules</NavLink>

      <NavLink to="/about">About</NavLink>
    </Flex>
  );
}
