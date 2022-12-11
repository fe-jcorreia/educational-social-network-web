import React from "react";
import Router from "next/router";
import { Flex, Image } from "@chakra-ui/react";

import { Header, Maintenance } from "@src/components";
import { useAuthenticate } from "@src/domain";

export default function GroupsPage() {
  const { logged, loading } = useAuthenticate();

  React.useEffect(() => {
    if (!loading && !logged) {
      Router.push("/");
    }
  }, [logged, loading]);

  if (loading || !logged) {
    return (
      <Flex w="100%" h="100vh" alignItems="center" justify="center">
        <Image src="/book.gif" alt="Book Gif" />
      </Flex>
    );
  }

  return (
    <>
      <Header />

      <Maintenance />
    </>
  );
}
