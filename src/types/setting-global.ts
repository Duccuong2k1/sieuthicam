import { BaseProps } from "./base";

export interface ISettingGlobal extends BaseProps {
    title: string
    description: string
    email: string
    address: string
    phone: string
    logo: string
    facebook: string
    banners: string[]
}