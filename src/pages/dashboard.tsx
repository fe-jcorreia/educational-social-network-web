import { Grid, GridItem, Text, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { HomeData } from "../model/home";
import { HomePostCard } from "../modules/home/home-post-card";
import { HomeRecommendationCard } from "../modules/home/home-recommendation-card";
import { HomeSideMenu } from "../modules/home/home-side-menu";
import { AppStrings } from "../strings";

const strings = AppStrings.Home.postsRecommendations;

const Dashboard: NextPage = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" mx="1rem" pt="1rem">
      <GridItem>
        <HomeSideMenu username={username} />
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
              <HomeRecommendationCard key={post.id} recomendationCard={post} />
            );
          })}
        <Text fontSize="xs">{strings.exploreMore}</Text>
      </GridItem>
    </Grid>
  );
};

const { mainHomePosts, mainRecommendationsPosts, username }: HomeData = {
  username: "bmovio",
  mainHomePosts: [
    {
      id: "1232-9502-8532",
      username: "jorji-kernelshita",
      repositoryLink: "https://shouldideploy.today",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais/Turma 2021",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8532",
      username: "jorji-kernelshita",
      repositoryLink: "https://shouldideploy.today",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais/Turma 2021",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8532",
      username: "jorji-kernelshita",
      repositoryLink: "https://shouldideploy.today",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais/Turma 2021",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8532",
      username: "jorji-kernelshita",
      repositoryLink: "https://shouldideploy.today",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais/Turma 2021",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8532",
      username: "jorji-kernelshita",
      repositoryLink: "https://shouldideploy.today",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais/Turma 2021",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
    {
      id: "1232-9502-8532",
      username: "jorji-kernelshita",
      repositoryLink: "https://shouldideploy.today",
      creationDate: "2022-07-29",
      lastUpdateDate: "2022-08-17",
      repositoryTitle: "sistemas-operacionais/Turma 2021",
      repositoryDescription: "Sistemas operacionais para POLI-USP",
      stars: 98,
      hasLiked: false,
    },
  ],
  mainRecommendationsPosts: [
    {
      id: "9341-5921-4520",
      stars: 1506,
      hasLiked: false,
      repositoryTitle: "tamytakara/formar-na-poli",
      repositoryDescription:
        "Repositório destinados a todos os amiguinhos que estão na jornada de se formar na escola politécnica com todos os conhecimentos acumulados da maior guru dessa escola",
      repositoryLink: "https://shouldideploy.today",
    },
    {
      id: "9341-1221-4520",
      stars: 1506,
      hasLiked: false,
      repositoryTitle: "tamytakara/formar-na-poli",
      repositoryDescription:
        "Repositório destinados a todos os amiguinhos que estão na jornada de se formar na escola politécnica com todos os conhecimentos acumulados da maior guru dessa escola",
      repositoryLink: "https://shouldideploy.today",
    },
    {
      id: "9341-4521-4520",
      stars: 1506,
      hasLiked: false,
      repositoryTitle: "tamytakara/formar-na-poli",
      repositoryDescription:
        "Repositório destinados a todos os amiguinhos que estão na jornada de se formar na escola politécnica com todos os conhecimentos acumulados da maior guru dessa escola",
      repositoryLink: "https://shouldideploy.today",
    },
  ],
};

export default Dashboard;
