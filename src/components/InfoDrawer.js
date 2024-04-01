import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex
} from "@chakra-ui/react";
export default function InfoDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        position="fixed"
        right="1%"
        top="25px"
        border="outset 3px grey"
        boxShadow="1px -1px 3px indigo,-1px 1px 3px white"
        width="50px"
        ref={btnRef}
        colorScheme="purple"
        onClick={onOpen}
      >
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
              <Flex
                className="drawerNavLinks"
                style={{
                  flexDirection: "column",
                  fontSize: "5rem",
                  color: "indigo"
                }}
              >
                <NavLink to="/game">Game</NavLink>
                <NavLink to="/rules">Rules</NavLink>
                <NavLink to="/about">About</NavLink>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
