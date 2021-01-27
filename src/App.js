import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  HStack,
  Code,
  Grid,
  theme
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./utils/ColorModeSwitcher";
import Navigation from "./components/Navigation";
import Application from "./components/Application";
import InfoDrawer from "./components/InfoDrawer";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Navigation />

            <HStack
              alignItems="center"
              justifyContent="flex-end"
              margin="2%"
              width="100vw"
            >
              <VStack>
                <ColorModeSwitcher
                  alignSelf="flex-end"
                  border="outset 3px gold"
                  boxShadow="1px -1px 3px indigo,-1px 1px 3px white"
                  width="50px"
                  justifySelf="flex-end"
                />
                <InfoDrawer
                  alignSelf="flex-end"
                  border="outset 3px gold"
                  boxShadow="1px -1px 3px indigo,-1px 1px 3px white"
                  width="50px"
                  justifySelf="flex-end"
                />
              </VStack>
            </HStack>
            <Application />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
