import { BaseProps } from "./base";
import { IProduct } from "./product";

export interface IInventory extends BaseProps {
    importInventoryBy: string
    code: string
    totalCost: number
    items: IItemsImport[]
}


export interface IItemsImport {
    productId: IProduct
    quantity: number
    importPrice: number
    salePrice: number
} 
