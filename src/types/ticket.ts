import { BaseProps } from "./base"

export interface ITicket extends BaseProps {
    ticketedBy:string
    description:string
    type:string 
    email:string
    message:string
}


export const TICKET_TYPES = [
    {
        value: "support",
        label: "Hỗ trợ",
        color: "blue",
    },
    {
        value: "general",
        label: "Chung ",
        color: "green",
    },
    {
        value: "other",
        label: "Khác",
        color: "gray",
    },
]