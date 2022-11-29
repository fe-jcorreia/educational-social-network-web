import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "@src/styles";
import { initFirebaseConfig } from "@src/services";
import { AuthProvider } from "@src/domain";

function MyApp({ Component, pageProps }: AppProps) {
  initFirebaseConfig();

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
