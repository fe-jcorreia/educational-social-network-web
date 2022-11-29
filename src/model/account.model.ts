export type AccountLoginForm = {
  email: string;
  password: string;
};

export type AccountSignUpForm = {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

enum RoleType {
  Common = "NORMAL",
  Admin = "ADMIN",
}

export type Location = {
  city: string;
  state: string;
  country: string;
};

export type User = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  role: RoleType;
  location: Location;
  description: string;
  career: string;
};
