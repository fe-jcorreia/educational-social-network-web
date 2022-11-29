export type Post = {
  id: string;
  repositoryNickname: string;
  repositoryTitle: string;
  repositoryId: string;
  creationDate: string;
  lastUpdateDate: string;
  stars: number;
  likeList: string[];
  title: string;
  subtitle: string;
  text: string;
  image?: string;
};

export type PostDatasource = {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  image: string;
  tags: {
    category: string;
  };
  verified: boolean;
  verifiedBy: string;
  likes: number;
  usersLiked: string[];
  userId: string;
  nickname: string;
  repositoryId: string;
  repositoryTitle: string;
  creationDate: string;
  lastUpdateDate: string;
};

export type CreatePostForm = {
  title: string;
  subtitle: string;
  text: string;
};

export type EditPostForm = {
  title: string;
  subtitle: string;
  text: string;
};
