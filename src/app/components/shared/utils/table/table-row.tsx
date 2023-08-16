import { useEffect, useState,Fragment } from "react";
import { Spinner } from "../misc/spinner";
interface TableRowProps<T> {
  children: (row: T,idx?:number | any) => React.ReactNode[];
  items: T[];
  textNotFound?:string | JSX.Element
}
export function TableRow<T>({ children, items , textNotFound}: TableRowProps<T>) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (items && items.length >= 0) {
      setIsLoading(false);
    }
  }, [items]);

  return (
    <>
      {isLoading ? (
        <tr>
          <td className="border-b" colSpan={100}>
            <Spinner className="flex flex-row justify-center w-full text-center" />
          </td>
        </tr>
      ) : items && !items.length && !isLoading ? (
        <tr>
          <td className="w-full p-3 text-xs text-center text-white" colSpan={100}>
             {textNotFound ? textNotFound : "게시물이 없습니다"} 
          </td>
        </tr>
      ) : (
        <>
          {items?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {children(row,rowIndex).map((node, columnIndex) => (
                <Fragment key={columnIndex}>{node}</Fragment>
              ))}
            </tr>
          ))}
        </>
      )}
    </>
  );
}

export function ColumnItem({
  value,
  col,
  align = "center",
}: {
  value: string | any;
  col?: number;
  align?:string;
}) {
  return (
    <td className={`p-2 text-${align} text-[13px]`} colSpan={col}>
      {value}
    </td>
  );
}
