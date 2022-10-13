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

export type User = {
  id: string;
  name: string
  email: string;
  username: string;
  description: string;
};
