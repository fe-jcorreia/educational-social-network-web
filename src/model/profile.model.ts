import { Repository } from "./repository.model";

export type ProfileData = {
  username: string;
  name: string;
  lastName: string;
  bio: string;
  email: string;
  role: string;
  location: Location;
  repositories: Repository[];
};

export type Location = {
  city: string;
  state: string;
  country: string;
};
