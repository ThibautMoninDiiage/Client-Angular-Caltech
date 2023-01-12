import { Role } from "./role.interface";

export interface UserAppRole {
  idUser: number,
  idApplication: number,
  role: Role
}