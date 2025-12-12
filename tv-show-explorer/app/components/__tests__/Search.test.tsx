import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Search from "../Search";

vi.mock("use-debounce", () => ({
  useDebouncedCallback: (fn: unknown) => fn,
}));

describe("Search Component", () => {
  it("renders search input with correct placeholder", () => {
    render(<Search placeholder="Search episodes..." />);

    const input = screen.getByPlaceholderText("Search episodes...");
    expect(input).toBeDefined();
  });
});
