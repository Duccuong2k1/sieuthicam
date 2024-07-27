import { BaseProps } from "./base";

export interface IThemes extends BaseProps {
    header: IHeader[]
    headerSelected: string
}

export interface IHeader extends BaseProps {
    title: string
    image: string
}