import React from "react";
import { DataTableUser } from "./component/DataTableUser";
import { UserProvider } from "./provider/user-provider";

type Props = {};

export default function UserTablePage({}: Props) {
  return (
    <UserProvider>
      <DataTableUser />
    </UserProvider>
  );
}
