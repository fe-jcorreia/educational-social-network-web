import { Location } from "./account.model";

export type EditProfileForm = {
  name: string;
  description: string;
  career: string;
  location: Location;
};
