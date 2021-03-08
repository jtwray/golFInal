import React, { useReducer } from "react";
import { gridReducer } from "./store/gridReducer";
import { initialState, init } from "./store/initialState";
import Timer from "./components/Timer";
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
import Application from "./components/Application";
import InfoDrawer from "./components/InfoDrawer";

function App() {
  const [state, dispatch] = useReducer(gridReducer, initialState);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <VStack>
            <HStack
              alignItems="center"
              justifyContent="flex-end"
              margin="0"
              width="100vw"
              maxWidth="880px"
              border="solid red 3px"
              height="auto"
            >
              <VStack>
                <ColorModeSwitcher
                  position="absolute"
                  right="1%"
                  top="1%"
                  alignSelf="flex-end"
                  border="outset 3px gold"
                  boxShadow="1px -1px 3px indigo,-1px 1px 3px white"
                  height="20px"
                  width="50px"
                  justifySelf="flex-end"
                />
                <InfoDrawer />
              </VStack>
            </HStack>
            <Application state={state} dispatch={dispatch} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
