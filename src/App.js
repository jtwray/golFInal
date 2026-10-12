import React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./utils/ColorModeSwitcher";
import Application from "./components/Application";
import InfoDrawer from "./components/InfoDrawer";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" pt="6rem">
        <ColorModeSwitcher
          position="fixed"
          right="1rem"
          top="70px"
          zIndex="10"
        />
        <InfoDrawer />
        <Application />
      </Box>
    </ChakraProvider>
  );
}

export default App;
