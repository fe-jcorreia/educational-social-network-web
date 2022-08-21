export type HomePostCardData = {
  id: string;
  username: string;
  repositoryLink: string;
  creationDate: string;
  lastUpdateDate: string;
  repositoryTitle: string;
  repositoryDescription: string;
  stars: number;
  hasLiked: boolean;
};

export type HomeRecommendationCardData = {
  id: string;
  stars: number;
  hasLiked: boolean;
  repositoryTitle: string;
  repositoryDescription: string;
  repositoryLink: string;
};

export type HomeData = {
  username: string;
  mainHomePosts: HomePostCardData[];
  mainRecommendationsPosts: HomeRecommendationCardData[];
};
