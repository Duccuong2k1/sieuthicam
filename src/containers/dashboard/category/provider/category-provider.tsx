
"use client"
import { createContext, useContext, useEffect, useState } from "react";

export const CategoryContext = createContext<Partial<{}>>({});

export function CategoryProvider({ ...props }) {
  return (
    <CategoryContext.Provider value={{}}>
      {props.children}
    </CategoryContext.Provider>
  );
}

export const useCategoryContext = () => useContext(CategoryContext);
