import { BaseProps } from "./base"

export interface ICoupon extends BaseProps {
   title:string;
   code:string;
   discount:number;
   expiry:string;
}
