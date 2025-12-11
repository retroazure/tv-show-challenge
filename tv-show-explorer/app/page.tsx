"use client";
import { useShow } from "@/hooks/useShow";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

const EPISODES_PER_PAGE = 12;

export default function Home() {
  const { data: show, isLoading, error } = useShow(6771);
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  if (!show) return <div className="p-6">Show not found</div>;

  const filteredEpisodes = (show.episodes || []).filter((episode) => {
    const query_lower = query.toLowerCase();
    return (
      episode.name.toLowerCase().includes(query_lower) ||
      episode.summary?.toLowerCase().includes(query_lower) ||
      String(episode.season).includes(query) ||
      String(episode.number).includes(query) ||
      episode.airdate.includes(query)
    );
  });

  const totalPages = Math.ceil(filteredEpisodes.length / EPISODES_PER_PAGE);
  const paginatedEpisodes = filteredEpisodes.slice(
    (currentPage - 1) * EPISODES_PER_PAGE,
    currentPage * EPISODES_PER_PAGE
  );

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error loading show</div>;
  if (!show) return <div className="p-6">Show not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          {show.coverImage && (
            <Image
              src={show.coverImage}
              alt={show.title}
              width={200}
              height={300}
              className="rounded-lg mb-6"
            />
          )}
          <h1 className="text-4xl font-bold mb-4">{show.title}</h1>
          {show.description && (
            <div className="text-lg text-gray-700 max-w-2xl">
              {show.description.replace(/<[^>]*>/g, "")}
            </div>
          )}
        </div>

        {show.episodes && show.episodes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Episodes</h2>

            <div className="mb-8 max-w-md mx-auto">
              <Search placeholder="Search episodes..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedEpisodes.length > 0 ? (
                paginatedEpisodes.map((episode) => (
                  <Link
                    key={episode.id}
                    href={`/episodes/${episode.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {episode.image?.medium ? (
                      <Image
                        src={episode.image.medium}
                        alt={episode.name}
                        width={300}
                        height={200}
                        className="w-full aspect-video object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">
                        S{String(episode.season).padStart(2, "0")}E
                        {String(episode.number).padStart(2, "0")} -{" "}
                        {episode.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {episode.airdate}
                      </p>
                      {episode.summary && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {episode.summary.replace(/<[^>]*>/g, "")}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No episodes found</p>
                </div>
              )}
            </div>

            {totalPages > 1 && <Pagination totalPages={totalPages} />}
          </div>
        )}
      </div>
    </div>
  );
}
