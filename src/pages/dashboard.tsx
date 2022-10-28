import { Grid, GridItem, Text, Heading, Flex, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { HomeData } from "@src/model";
import {
  HomePostCard,
  HomeRecommendationCard,
  HomeSideMenu,
} from "@src/modules/home";
import { AppStrings } from "@src/strings";
import { Header } from "@src/components";
import Router from "next/router";
import { useAuthenticate } from "@src/domain/account";

const strings = AppStrings.Home.postsRecommendations;

const Dashboard: NextPage = () => {
  const { user, logged, loading } = useAuthenticate();

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
      <Grid templateColumns="repeat(5, 1fr)" mx="1rem" pt="1rem">
        <GridItem>
          <HomeSideMenu username={user?.nickname} />
        </GridItem>

        <GridItem colStart={2} colEnd={5}>
          {mainHomePosts &&
            mainHomePosts?.map((post) => {
              return <HomePostCard key={post.id} mainHomePosts={post} />;
            })}
        </GridItem>

        <GridItem>
          <Heading fontSize="sm" mb="1rem">
            {strings.title}
          </Heading>
          {mainRecommendationsPosts &&
            mainRecommendationsPosts?.map((post) => {
              return (
                <HomeRecommendationCard
                  key={post.id}
                  recomendationCard={post}
                  username={post.username}
                />
              );
            })}
          <Text fontSize="xs">{strings.exploreMore}</Text>
        </GridItem>
      </Grid>
    </>
  );
};

const { mainHomePosts, mainRecommendationsPosts }: HomeData = {
  mainHomePosts: [
    {
      id: "1232-9502-8531",
      username: "fe-jcorreia",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8532",
      username: "gigi97princess",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8533",
      username: "tamy_takara",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8534",
      username: "fe-jcorreia",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8535",
      username: "fe-jcorreia",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8536",
      username: "fe-jcorreia",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
  ],
  mainRecommendationsPosts: [
    {
      id: "9341-5921-4520",
      username: "tamyatsu",
      stars: 1506,
      hasLiked: false,
      repositoryTitle: "formar-na-poli",
      repositoryDescription:
        "Repositório destinados a todos os amiguinhos que estão na jornada de se formar na escola politécnica com todos os conhecimentos acumulados da maior guru dessa escola",
    },
    {
      id: "9341-1221-4520",
      username: "tamyatsu",
      stars: 1506,
      hasLiked: false,
      repositoryTitle: "formar-na-poli",
      repositoryDescription:
        "Repositório destinados a todos os amiguinhos que estão na jornada de se formar na escola politécnica com todos os conhecimentos acumulados da maior guru dessa escola",
    },
    {
      id: "9341-4521-4520",
      username: "tamyatsu",
      stars: 1506,
      hasLiked: false,
      repositoryTitle: "formar-na-poli",
      repositoryDescription:
        "Repositório destinados a todos os amiguinhos que estão na jornada de se formar na escola politécnica com todos os conhecimentos acumulados da maior guru dessa escola",
    },
  ],
};

export default Dashboard;
