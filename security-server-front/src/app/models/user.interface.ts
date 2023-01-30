import { Application } from "./application.interface";
import { Role } from "./role.interface";

export interface User {
  id?: number;
  username: string;
  password?: string
  mail: string;
  avatar: string;
  firstname?: string;
  lastname?: string;
  idApplication?: number;
  applications?: Array<Application>;
  role?: Role;

}

