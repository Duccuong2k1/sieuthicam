import React, { ReactNode } from "react";
import { TableHeader } from "./table-header";

interface CommonTableProps extends ReactProps {
  children?: ReactNode; // Children can include input elements
  style?: string | any;
  tableClassName?: string | any;
  columns: ColumnProps[];
  items: Record<string, any>[];
  align?: string;
}

export function Table({
  columns,
  items,
  style,
  tableClassName = "",
  children,
  align = "center",
  ...props
}: CommonTableProps) {
  return (
    <>
      <table
        style={style}
        className={`w-full overflow-x-auto rounded bg-[#161616]  ${tableClassName} `}
      >
        <TableHeader columns={columns} align={align} />
        <tbody>
          <>{children && <>{children}</>}</>
        </tbody>
      </table>
    </>
  );
}

export interface ColumnProps {
  label?: string;
  field: string;
}

const Column = ({ children }: ColumnProps & ReactProps) => <>children</>; // This is just a placeholder
Column.displayName = "Column";
Table.Column = Column;

export default Table;
