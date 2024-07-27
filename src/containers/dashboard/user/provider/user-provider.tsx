import { getUserList } from "@/actions/user.action";
import { IUser } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<
  Partial<{
    users: IUser[];
    setUsers: (users: IUser[]) => void;
    isLoadingData: boolean;
    setIsLoadingData: (isLoadingData: boolean) => void;
    refreshUserList: () => void;
  }>
>({});

export function UserProvider({ ...props }) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  const fetchUserList = async () => {
    setIsLoadingData(true);
    try {
      const res = await getUserList();
      if (res && res.success) {
        setUsers(res.data);
      }
    } catch (err) {
      console.log("Error fetching user list:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isLoadingData) {
      fetchUserList();
    }
  }, [isLoadingData]);

  const refreshUserList = () => {
    setIsLoadingData(true);
  };

  useEffect(() => {
    refreshUserList();
  }, []);
  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        isLoadingData,
        setIsLoadingData,
        refreshUserList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
