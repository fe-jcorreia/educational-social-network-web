export type LoginAccountFormData = {
  email: string;
  password: string;
};

export type SignUpAccountFormData = {
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

export type User = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  role: RoleType;
  city: string;
  state: string;
  country: string;
  description: string;
  // career: string;
};
