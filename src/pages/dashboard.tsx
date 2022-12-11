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
  Menu,
  MenuButton,
  MenuList,
  Button,
  Checkbox,
  VStack,
  Icon,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { filterTypes, Post, Repository } from "@src/model";
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
import { FiFilter } from "react-icons/fi";

const strings = AppStrings.Home.postsRecommendations;

const Dashboard: NextPage = () => {
  const { user, logged, loading } = useAuthenticate();
  const [filterCheckedItems, setFilterCheckedItems] = React.useState<string[]>(
    []
  );
  const [filteredPosts, setFilteredPosts] = React.useState<Post[]>([]);

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

  const handleChangeFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wasChecked = filterCheckedItems.includes(e.target.value);
    setFilterCheckedItems((prev) =>
      wasChecked
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  React.useEffect(() => {
    setFilteredPosts(
      postsData.filter((post) =>
        post.category ? filterCheckedItems.includes(post.category) : false
      )
    );
  }, [postsData, filterCheckedItems]);

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

      setPostsData((prev) => {
        const totalPosts = [...prev, ...newPosts];

        const orderedPosts = totalPosts
          .sort(function (postA, postB) {
            var dateA = postA.lastUpdateDate,
              dateB = postB.lastUpdateDate;

            var aa = new Date(dateA);
            var bb = new Date(dateB);

            return Number(aa) - Number(bb);
          })
          .reverse();

        return orderedPosts;
      });
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
          <Box maxW="70%" mx="auto" mb="2rem">
            <Menu>
              <MenuButton
                p="0"
                _hover={{ bg: "transparent" }}
                _focus={{ bg: "transparent" }}
                colorScheme="teal"
                variant="ghost"
                as={Button}
              >
                <Icon as={FiFilter} mr="0.5rem" />
                Filtrar categorias
              </MenuButton>
              <MenuList>
                <VStack align="start" mx="1rem" my="0.5rem">
                  {filterTypes.map((filter) => (
                    <Checkbox
                      key={filter}
                      onChange={handleChangeFilters}
                      value={filter}
                    >
                      {filter}
                    </Checkbox>
                  ))}
                </VStack>
              </MenuList>
            </Menu>
          </Box>

          {postsData.length ? (
            <>
              {filterCheckedItems.length ? (
                <>
                  {filteredPosts.map((post, index) => {
                    if (filteredPosts.length === index + 1) {
                      return (
                        <div key={post.id} ref={null}>
                          <HomePostCard post={post} />
                        </div>
                      );
                    } else {
                      return <HomePostCard post={post} key={post.id} />;
                    }
                  })}
                </>
              ) : (
                <>
                  {postsData.map((post, index) => {
                    if (postsData.length === index + 1) {
                      return (
                        <div
                          key={post.id}
                          ref={hasNextPostHomePage ? lastElementRef : null}
                        >
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
