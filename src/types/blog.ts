import { BaseProps } from "./base";
import { IUser } from "./user";

export interface IBlog extends BaseProps {
    title: string
    description: string
    category: string
    numberViews: number
    likes: IUser[]
    disLikes: IUser[]
    image: string
    author: string
}

export interface ICategoryBlog extends BaseProps {
    title: string
    blog: IBlog
}