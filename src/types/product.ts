import { BaseProps } from "./base";

export interface IProduct extends BaseProps {
  title: string;
  slug: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  quantity: number;
  sold: number;
  thumbnail?: string;
  images?: string[];
  totalRatings: number;
  ratings: string[];
  code: string;
  unit: string;
  weight: number | string;
  salePrice: number
}


