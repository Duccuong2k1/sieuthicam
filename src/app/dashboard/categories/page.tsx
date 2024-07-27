import BrandTablePage from "@/containers/dashboard/brand";
import CategoryTablePage from "@/containers/dashboard/category";
import React from "react";

type Props = {};

export default function CategoriesPage({}: Props) {
  return (
    <>
      <CategoryTablePage />
      <BrandTablePage />

    </>
  );
}
