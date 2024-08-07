import React from "react";
import { DataTableBrand } from "./component/DataTableBrand";
import { BrandProvider } from "./provider/brand-provider";

type Props = {};

export default function BrandTablePage({}: Props) {
  return (
    <BrandProvider>
      <DataTableBrand />
    </BrandProvider>
  );
}
