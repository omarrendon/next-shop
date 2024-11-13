"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn, generatePaginationNumbers } from "@/utils";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;

  let currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1) currentPage = 1;

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber <= 0) {
      //href='/'
      return `${pathName}`;
    }

    if (+pageNumber > totalPages) {
      //  Next >
      return `${pathName}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item ">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageURL(currentPage - 1)}
              tabIndex={-1}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li key={page} className="page-item">
              <Link
                key={index}
                className={cn(
                  `page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`,
                  currentPage === page &&
                    "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white"
                )}
                href={createPageURL(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageURL(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
