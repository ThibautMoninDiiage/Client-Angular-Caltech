import { Role } from "./role.interface";

export interface User {
  id?: number;
  username: string;
  password: string
  mail: string;
  avatar: string;
  role : Role;
}

