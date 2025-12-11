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

  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-4"
      aria-label="Pagination"
    >
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
          currentPage <= 1
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "border border-gray-300 hover:bg-gray-100"
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft size={18} />
        Previous
      </Link>

      <div className="flex gap-2">
        {allPages.map((page) => (
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
        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
          currentPage >= totalPages
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "border border-gray-300 hover:bg-gray-100"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Next
        <ChevronRight size={18} />
      </Link>
    </nav>
  );
}
