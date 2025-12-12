import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EpisodeDetailPage from "../page";
import * as fetchEpisodeModule from "@/app/lib/fetch-episode";
import * as actionsModule from "@/app/server/actions";
import type { IEpisode } from "@/domain/types/TvShow";

vi.mock("@/app/lib/fetch-episode");
vi.mock("@/app/server/actions");

describe("Episode Detail Page", () => {
  it("displays 'Episode not found' when episode is null", async () => {
    vi.mocked(fetchEpisodeModule.fetchEpisode).mockResolvedValue(null);
    vi.mocked(actionsModule.isFavoritedEpisode).mockResolvedValue(false);

    const params = Promise.resolve({ id: "999" });
    const component = await EpisodeDetailPage({ params });

    render(component);
    expect(screen.getByText("Episode not found")).toBeDefined();
  });

  it("displays episode title", async () => {
    const mockEpisode: IEpisode = {
      id: 1,
      name: "Test Episode",
      season: 1,
      number: 1,
      airdate: "2024-01-01",
      summary: "Summary",
      runtime: 30,
      url: "https://example.com",
    };

    vi.mocked(fetchEpisodeModule.fetchEpisode).mockResolvedValue(mockEpisode);
    vi.mocked(actionsModule.isFavoritedEpisode).mockResolvedValue(false);

    const params = Promise.resolve({ id: "1" });
    const component = await EpisodeDetailPage({ params });

    render(component);
    expect(screen.getByText("Test Episode")).toBeDefined();
  });

  it("displays season and episode number", async () => {
    const mockEpisode: IEpisode = {
      id: 1,
      name: "Test Episode",
      season: 2,
      number: 5,
      airdate: "2024-01-01",
      summary: "Summary",
      runtime: 30,
      url: "https://example.com",
    };

    vi.mocked(fetchEpisodeModule.fetchEpisode).mockResolvedValue(mockEpisode);
    vi.mocked(actionsModule.isFavoritedEpisode).mockResolvedValue(false);

    const params = Promise.resolve({ id: "1" });
    const component = await EpisodeDetailPage({ params });

    render(component);
    expect(screen.getByText(/Season 2/)).toBeDefined();
    expect(screen.getByText(/Episode 5/)).toBeDefined();
  });

  it("renders back link", async () => {
    const mockEpisode: IEpisode = {
      id: 1,
      name: "Test Episode",
      season: 1,
      number: 1,
      airdate: "2024-01-01",
      summary: "Summary",
      runtime: 30,
      url: "https://example.com",
    };

    vi.mocked(fetchEpisodeModule.fetchEpisode).mockResolvedValue(mockEpisode);
    vi.mocked(actionsModule.isFavoritedEpisode).mockResolvedValue(false);

    const params = Promise.resolve({ id: "1" });
    const component = await EpisodeDetailPage({ params });

    render(component);
    const backLink = screen.getByLabelText("Back to episodes");
    expect(backLink).toBeDefined();
  });
});
