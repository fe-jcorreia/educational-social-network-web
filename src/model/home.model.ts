import { Repository } from "./repository.model";

export interface HomePostCardData extends Repository {}

export type HomeRecommendationCardData = {
  id: string;
  stars: number;
  hasLiked: boolean;
  repositoryTitle: string;
  repositoryDescription: string;
};

export type HomeData = {
  username: string;
  mainHomePosts: HomePostCardData[];
  mainRecommendationsPosts: HomeRecommendationCardData[];
};
