import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/react";
export default function InfoDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        position="fixed"
        right="1rem"
        top="1rem"
        zIndex="10"
        border="outset 3px grey"
        boxShadow="1px -1px 3px indigo,-1px 1px 3px white"
        minWidth="44px"
        minHeight="44px"
        ref={btnRef}
        colorScheme="purple"
        onClick={onOpen}
        aria-label="Open navigation"
      >
        Menu
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent className="navigationDrawer">
            <DrawerCloseButton aria-label="Close navigation" />
            <DrawerHeader>Navigate</DrawerHeader>
            <DrawerBody>
              <nav className="drawerNavLinks" aria-label="Main navigation">
                <NavLink to="/game" onClick={onClose} activeClassName="active">
                  Game
                </NavLink>
                <NavLink to="/rules" onClick={onClose} activeClassName="active">
                  Rules
                </NavLink>
                <NavLink to="/about" onClick={onClose} activeClassName="active">
                  About
                </NavLink>
              </nav>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
