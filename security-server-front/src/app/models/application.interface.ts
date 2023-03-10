import { Role } from "./role.interface";

export interface Application {
  id?: number;
  name: string;
  url: string;
  description: string;
  secretCode?: string;
  role?: Role;
}
