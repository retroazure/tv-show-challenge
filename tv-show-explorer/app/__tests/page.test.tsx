import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "../page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as useShowModule from "@/hooks/useShow";
import type { IEpisode, IShowDetails } from "@/domain/types/TvShow";

vi.mock("@/hooks/useShow");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = "QueryClientWrapper";

  return Wrapper;
};

describe("Home Page", () => {
  it("displays loading state", () => {
    vi.mocked(useShowModule.useShow).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    } as any);

    render(<Home />, { wrapper: createWrapper() });
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("displays error state", () => {
    vi.mocked(useShowModule.useShow).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed"),
    } as any);

    render(<Home />, { wrapper: createWrapper() });
    expect(screen.getByText("Error loading show")).toBeDefined();
  });

  it("displays show title", () => {
    const mockShow: IShowDetails = {
      title: "The Powerpuff Girls",
      description: "Test description",
      coverImage: "",
      episodes: [],
    };

    vi.mocked(useShowModule.useShow).mockReturnValue({
      data: mockShow,
      isLoading: false,
      error: null,
    } as any);

    render(<Home />, { wrapper: createWrapper() });
    expect(screen.getByText("The Powerpuff Girls")).toBeDefined();
  });

  it("displays episodes heading when there are episodes", () => {
    const mockEpisode: IEpisode = {
      id: 1,
      name: "Episode 1",
      season: 1,
      number: 1,
      airdate: "2024-01-01",
      summary: "Summary",
      runtime: 30,
      url: "https://example.com",
    };

    const mockShow: IShowDetails = {
      title: "Test Show",
      description: "Description",
      coverImage: "",
      episodes: [mockEpisode],
    };

    vi.mocked(useShowModule.useShow).mockReturnValue({
      data: mockShow,
      isLoading: false,
      error: null,
    } as any);

    render(<Home />, { wrapper: createWrapper() });
    expect(screen.getByText("Episodes")).toBeDefined();
  });
});
