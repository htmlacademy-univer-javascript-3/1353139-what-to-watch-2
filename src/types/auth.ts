export interface AuthPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  token: string;
  avatarUrl: string;
}
