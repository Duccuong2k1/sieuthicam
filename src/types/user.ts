import { BaseProps } from "./base";

export interface IUser extends BaseProps {
  firstName?: string;
  email?: string;
  lastName?: string;
  phone?: string;
  address?: any[];
  wishlist?: any[];
  isBlocked?: boolean;
  cart?: any[];
  role?:"admin" | "user"
}



export const USER_ROLES = ["admin", "user"]