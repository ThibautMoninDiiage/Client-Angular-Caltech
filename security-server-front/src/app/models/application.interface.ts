import { Role } from "./role.interface";

export interface Application {
  id?: number;
  name: string;
  url: string;
  description: string;
  redirectUri?: string;
  role?: Role;
}
