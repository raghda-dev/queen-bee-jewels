// app/(main)/lib/redux/user/userTypes.ts

export type User = {
  id: string;
  full_name: string;
  email: string;
  username: string;
  address?: string;
  avatar?: string;
};

export type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

export type UserUpdatePayload = {
  full_name?: string;
  email?: string;
  username?: string;
  password?: string;
  address?: string;
  avatar?: string;
};

