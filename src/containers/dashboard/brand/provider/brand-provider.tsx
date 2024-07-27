"use client";


import { createContext, useContext} from "react";

export const BrandContext = createContext<
  Partial<{
    
  }>
>({});

export function BrandProvider({ ...props }) {
 
  return (
    <BrandContext.Provider
      value={{

      }}
    >
      {props.children}
    </BrandContext.Provider>
  );
}

export const useBrandContext = () => useContext(BrandContext);
