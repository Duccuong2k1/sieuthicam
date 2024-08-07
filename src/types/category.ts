import { BaseProps } from "./base";

export interface ICategory extends BaseProps {
    title: string
    brands?: IBrand[]
    slug?: string
}


export interface IBrand extends BaseProps {
    title: string
    category?: ICategory
}