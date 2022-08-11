import { extendTheme } from "@chakra-ui/react";

const Link = {
  baseStyle: {
    _hover: {
      textDecoration: "none",
      color: "blue.500",
      transition: "0.2s",
    },
  },
};

export const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "blue.900",
      },
    },
  },
  components: {
    Link,
  },
});
