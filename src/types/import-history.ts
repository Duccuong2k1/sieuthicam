import { BaseProps } from "./base";
import { IItemsImport } from "./inventory";

export interface IImportHistoryInventory extends BaseProps {
    createBy: string;
    products: IItemsImport[]
    code: string;


}