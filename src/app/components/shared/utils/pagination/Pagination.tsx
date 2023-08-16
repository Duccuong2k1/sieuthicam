import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface Item {
  // Define your item properties
}

interface PaginationProps {
  items: Item[];
  itemsPerPage: number;
  currentItems?: (page: any) => any;
  isShowPaging?: boolean;
  getCurrentPage?:(page:number)=>any

}

export function Pagination({
  items,
  itemsPerPage,
  currentItems,
  isShowPaging = true,
  getCurrentPage,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsPage = items?.slice(startIndex, endIndex);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    currentItems?.(itemsPage);
  }, [itemsPage?.length]);

  useEffect(()=>{
    getCurrentPage?.(currentPage)
  },[currentPage])

  return (
    <div
      className={`flex items-center ${
        isShowPaging ? "justify-between" : "justify-center"
      } py-3 `}
    >
      {isShowPaging && (
        <p className="text-sm text-white">
          전시{" "}
          <span className="font-medium">
            {startIndex === 0 ? 1 : startIndex}
          </span>{" "}
          에게 <span className="font-medium">{endIndex}</span> ~의{" "}
          <span className="font-medium">{totalPages} </span>
        </p>
      )}
      {!!pageNumbers.length && (
        <div className="flex flex-row items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`h-7 rounded px-1.5 text-lg text-black ${
              currentPage === 1 ? "bg-[#efefef]" : "bg-white "
            }`}
          >
            <HiChevronLeft />
          </button>
          <ul className="flex flex-row items-center justify-start gap-1">
            {pageNumbers.map((page, index) => (
              <li key={index}>
                <span
                  className={`show cursor-pointer rounded bg-white px-2.5 py-1  ${
                    currentPage === page ? "text-warning" : "text-black"
                  } `}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`h-7 rounded  px-1.5 text-lg text-black ${
              currentPage === totalPages ? "bg-[#efefef]" : "bg-white"
            }`}
          >
            <HiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
