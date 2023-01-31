import { Role } from "./role.interface";

export interface UserAppRole {
  userId: number,
  applicationId: number,
  role: Role
}