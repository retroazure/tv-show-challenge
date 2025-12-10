"use client";

import { useShow } from "@/hooks/useShow";
import Image from "next/image";

export default function Home() {
  const { data: show, isLoading, error } = useShow(6771);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error loading show</div>;
  if (!show) return <div className="p-6">Show not found</div>;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl w-full px-6 text-center">
        {show.coverImage && (
          <Image
            src={show.coverImage}
            alt={show.title}
            width={200}
            height={300}
            className="rounded-lg mx-auto mb-6"
          />
        )}
        <h1 className="text-4xl font-bold mb-4 ">{show.title}</h1>
        {show.description && (
          <div
            className=" text-lg"
            dangerouslySetInnerHTML={{ __html: show.description }}
          />
        )}
      </div>
    </div>
  );
}
