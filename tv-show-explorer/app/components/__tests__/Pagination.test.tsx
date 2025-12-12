import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Pagination from "../Pagination";

describe("Pagination Component", () => {
  it("renders Previous and Next buttons", () => {
    render(<Pagination totalPages={5} />);

    expect(screen.getByText("Previous")).toBeDefined();
    expect(screen.getByText("Next")).toBeDefined();
  });

  it("renders page numbers", () => {
    render(<Pagination totalPages={3} />);

    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
    expect(screen.getAllByText("3").length).toBeGreaterThan(0);
  });

  it("renders navigation element", () => {
    render(<Pagination totalPages={5} />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeDefined();
  });
});
