"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const safePage = Math.min(Math.max(Number(pageNumber), 1), totalPages);
    const params = new URLSearchParams(searchParams);
    params.set("page", safePage.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const windowSize = 5;
  const windowStart = currentPage;
  const windowEnd = Math.min(currentPage + windowSize - 1, totalPages);

  const mobilePages = Array.from(
    { length: windowEnd - windowStart + 1 },
    (_, i) => windowStart + i
  );

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-4"
      aria-label="Pagination"
    >
      <Link
        href={currentPage <= 1 ? "#" : createPageURL(currentPage - 1)}
        onClick={(e) => currentPage <= 1 && e.preventDefault()}
        className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
          currentPage <= 1
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "border border-gray-300 hover:bg-gray-100"
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      <div className="flex gap-1 sm:hidden">
        {mobilePages.map((page) => (
          <Link
            key={`m-${page}`}
            href={createPageURL(page)}
            className={`px-3 py-2 rounded-lg ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <div className="hidden sm:flex gap-2">
        {allPages.map((page) => (
          <Link
            key={`d-${page}`}
            href={createPageURL(page)}
            className={`px-3 py-2 rounded-lg ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={currentPage >= totalPages ? "#" : createPageURL(currentPage + 1)}
        onClick={(e) => currentPage >= totalPages && e.preventDefault()}
        className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
          currentPage >= totalPages
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "border border-gray-300 hover:bg-gray-100"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </Link>
    </nav>
  );
}
