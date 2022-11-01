import { Role } from '../../types/role';

export interface AuthState {
  id: string;
  email: string;
  accessToken: string;
  role: Role;
  exp: number;
}
export interface AuthCredentials {
  email: string;
  password: string;
}
