import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@src/styles";
import { Header } from "@src/components";
import { initFirebaseConfig } from "@src/services";

function MyApp({ Component, pageProps }: AppProps) {
  initFirebaseConfig();

  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
