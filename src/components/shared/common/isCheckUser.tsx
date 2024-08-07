import { GetValueLocalStorage, GetValueToken } from "@/libs/constants/get-value-storage";
import { GLOBAL } from "@/libs/constants/global";

export const isCheckUser = (key:string) => {
  if (typeof window !== "undefined") {
    const currentAccount = GetValueLocalStorage(key)
    return currentAccount;
  }
};
