export type User = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type Users = Array<User>;
