import React from "react";
import { DataTableCategory } from "./component/DataTableCategory";
import { CategoryProvider } from "./provider/category-provider";

type Props = {};

export default function CategoryTablePage({}: Props) {
  return (
    <CategoryProvider>
      <DataTableCategory />
    </CategoryProvider>
  );
}
