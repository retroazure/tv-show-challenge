import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FavoriteButton from "../FavoriteButton";
import * as actionsModule from "@/app/server/actions";
import type { IEpisode } from "@/domain/types/TvShow";

vi.mock("@/app/server/actions");

describe("FavoriteButton Component", () => {
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

  it("renders with unfavorited state", () => {
    render(<FavoriteButton episode={mockEpisode} initialIsFavorited={false} />);

    expect(screen.getByText("Add to Favorites")).toBeDefined();
  });

  it("renders with favorited state", () => {
    render(<FavoriteButton episode={mockEpisode} initialIsFavorited={true} />);

    expect(screen.getByText("Favorited")).toBeDefined();
  });

  it("has accessible aria-label", () => {
    render(<FavoriteButton episode={mockEpisode} initialIsFavorited={false} />);

    const button = screen.getByLabelText("Add to favorites");
    expect(button).toBeDefined();
  });

  it("calls toggleFavorite on click", async () => {
    vi.mocked(actionsModule.toggleFavorite).mockResolvedValue({
      success: true,
      isFavorited: true,
    });

    render(<FavoriteButton episode={mockEpisode} initialIsFavorited={false} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(actionsModule.toggleFavorite).toHaveBeenCalledWith(mockEpisode);
    });
  });

  it("updates state after successful toggle", async () => {
    vi.mocked(actionsModule.toggleFavorite).mockResolvedValue({
      success: true,
      isFavorited: true,
    });

    render(<FavoriteButton episode={mockEpisode} initialIsFavorited={false} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Favorited")).toBeDefined();
    });
  });
});
