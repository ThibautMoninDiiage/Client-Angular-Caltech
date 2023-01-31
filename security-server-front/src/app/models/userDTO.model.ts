import { User } from "./user.interface";

export interface UserDTO extends User {
  token: string
}
