import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@src/styles";
import { initFirebaseConfig } from "@src/services";
import { AuthProvider } from "@src/domain/account/authenticate.use-case";
import React from "react";

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
