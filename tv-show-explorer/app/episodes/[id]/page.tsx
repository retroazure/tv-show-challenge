import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isFavoritedEpisode } from "@/app/server/actions";
import FavoriteButton from "@/app/components/FavoriteButton";
import { fetchEpisode } from "@/app/lib/fetch-episode";

interface EpisodeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EpisodeDetailPage({
  params,
}: Readonly<EpisodeDetailPageProps>) {
  const { id } = await params;
  const episodeId = Number(id);

  const [episode, isFavorited] = await Promise.all([
    fetchEpisode(episodeId),
    isFavoritedEpisode(episodeId),
  ]);

  if (!episode) return <div className="p-6">Episode not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center gap-2"
          aria-label="Back to episodes"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {episode.image?.original && (
            <Image
              src={episode.image.original}
              alt={episode.name}
              width={600}
              height={400}
              className="w-full object-cover"
            />
          )}

          <div className="p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-4xl font-bold">{episode.name}</h1>
              <FavoriteButton
                episode={episode}
                initialIsFavorited={isFavorited}
              />
            </div>

            <div className="mb-6 text-gray-600">
              <p className="mb-2">
                <span className="font-semibold">
                  Season {episode.season} • Episode {episode.number}
                </span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Air Date:</span>{" "}
                {episode.airdate}
              </p>
              {!!episode.runtime && (
                <p>
                  <span className="font-semibold">Runtime:</span>{" "}
                  {episode.runtime} minutes
                </p>
              )}
            </div>

            {episode.summary && (
              <div className="text-lg text-gray-700">
                <h2 className="text-2xl font-bold mb-4">Summary</h2>
                <p>{episode.summary.replaceAll(/<[^>]*>/g, "")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
