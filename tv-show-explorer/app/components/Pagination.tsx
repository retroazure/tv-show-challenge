"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // ✅ Sliding window of 5 pages
  const windowSize = 5;
  const windowStart =
    Math.floor((currentPage - 1) / windowSize) * windowSize + 1;
  const windowEnd = Math.min(windowStart + windowSize - 1, totalPages);

  const visiblePages = Array.from(
    { length: windowEnd - windowStart + 1 },
    (_, i) => windowStart + i
  );

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-4"
      aria-label="Pagination"
    >
      <Link
        href={createPageURL(currentPage - 1)}
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

      <div className="flex gap-1 sm:gap-2 justify-center">
        {visiblePages.map((page) => (
          <Link
            key={page}
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
        href={createPageURL(currentPage + 1)}
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
