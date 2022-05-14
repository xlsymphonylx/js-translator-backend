export interface User {
  email: string;
  password: string;
  name: string;
  id?: number;
}

export interface LoginUser {
  email: string;
  password: string;
}
