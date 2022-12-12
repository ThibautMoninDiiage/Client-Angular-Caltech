import { Role } from "./role.interface";

export interface User {
  id?: number;
  username: string;
  mail: string;
  avatar: string;
  role : Role;
}

