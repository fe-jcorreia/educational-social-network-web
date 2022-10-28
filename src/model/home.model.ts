import { Repository } from "./repository.model";

export interface HomePostCardData extends Repository {}

export type HomeRecommendationCardData = {
  id: string;
  username: string;
  stars: number;
  hasLiked: boolean;
  repositoryTitle: string;
  repositoryDescription: string;
};

export type HomeData = {
  mainHomePosts: HomePostCardData[];
  mainRecommendationsPosts: HomeRecommendationCardData[];
};
