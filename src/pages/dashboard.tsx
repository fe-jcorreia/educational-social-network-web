import {
  Grid,
  GridItem,
  Text,
  Heading,
  Flex,
  Image,
  Spinner,
  Box,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { Post, Repository } from "@src/model";
import {
  HomePostCard,
  HomeRecommendationCard,
  HomeSideMenu,
} from "@src/modules/home";
import { AppStrings } from "@src/strings";
import { Header } from "@src/components";
import Router from "next/router";
import { useAuthenticate, useGetPostFeed } from "@src/domain";
import { useGetRepositoryFeed } from "@src/domain/get-repository-feed.use-case";

const strings = AppStrings.Home.postsRecommendations;

const Dashboard: NextPage = () => {
  const { user, logged, loading } = useAuthenticate();
  const [pageCount, setPageCount] = React.useState(0);

  const [postsData, setPostsData] = React.useState<Post[]>([]);
  const [hasNextPostHomePage, setHasNextPostHomePage] = React.useState(true);

  const [repositoriesData, setRepositoriesData] = React.useState<Repository[]>(
    []
  );

  const observer = React.useRef();
  const lastElementRef = React.useCallback(
    (node: any) => {
      if (loading) return;
      // @ts-ignore
      if (observer.current) observer.current.disconnect();
      // @ts-ignore
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageCount((prev) => prev + 1);
        }
      });
      // @ts-ignore
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const { getPosts } = useGetPostFeed();
  const { getRepositories } = useGetRepositoryFeed();

  React.useEffect(() => {
    async function getRepositoriesHomeData() {
      const repositories = await getRepositories({
        userId: user?.id,
        pageNumber: 0,
      });

      setRepositoriesData(repositories);
    }

    if (user?.id) {
      getRepositoriesHomeData();
    }
  }, [getRepositories, user?.id]);

  React.useEffect(() => {
    async function getPostsHomeData() {
      const { posts: newPosts, hasNextPage } = await getPosts({
        userId: user?.id,
        pageNumber: pageCount,
      });

      setPostsData((prev) => [...prev, ...newPosts]);
      setHasNextPostHomePage(hasNextPage);
    }

    if (user?.id) {
      getPostsHomeData();
    }
  }, [getPosts, pageCount, user?.id]);

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
          {postsData.length ? (
            <>
              {postsData?.map((post, index) => {
                if (postsData.length === index + 1) {
                  return (
                    <div key={post.id} ref={lastElementRef}>
                      <HomePostCard post={post} />
                    </div>
                  );
                } else {
                  return <HomePostCard post={post} key={post.id} />;
                }
              })}
              {hasNextPostHomePage && (
                <Box maxW="70%" mx="auto" textAlign="center">
                  <Spinner my="2rem" />
                </Box>
              )}
            </>
          ) : (
            <Box maxW="70%" mx="auto">
              <Box mb="4rem">
                <SkeletonCircle size="40px" />
                <SkeletonText mt="4" noOfLines={6} spacing="4" />
              </Box>
              <Box mb="4rem">
                <SkeletonCircle size="40px" />
                <SkeletonText mt="4" noOfLines={6} spacing="4" />
              </Box>
              <Box mb="4rem">
                <SkeletonCircle size="40px" />
                <SkeletonText mt="4" noOfLines={6} spacing="4" />
              </Box>
            </Box>
          )}
        </GridItem>

        <GridItem>
          <Heading fontSize="sm" mb="1rem">
            {strings.title}
          </Heading>
          {repositoriesData &&
            repositoriesData?.map((repository) => {
              return (
                <HomeRecommendationCard
                  key={repository.id}
                  repository={repository}
                />
              );
            })}
          <Text fontSize="xs">{strings.exploreMore}</Text>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
