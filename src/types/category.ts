import { BaseProps } from "./base";

export interface ICategory extends BaseProps{
    title:string
    brands?:IBrand[]
}


export interface IBrand extends BaseProps {
    title:string
    category?:ICategory
}