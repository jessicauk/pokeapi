import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import Pagination from ".";

// creating mock functions
const previous = vi.fn();
const next = vi.fn();

describe("Pagination", () => {
  beforeEach(() => {
    previous.mockClear();
    next.mockClear();
    render(<Pagination previous={previous} page={1} total={10} next={next} />);
  });

  afterEach(() => {
    previous.mockClear();
    next.mockClear();
    cleanup();
  });

  it("should render the pagination", () => {
    const pagination = screen.getByRole("region", { name: /pagination/i });
    // within(pagination).debug();

    const previousButton = within(pagination).getByTestId("previous-button");
    const nextButton = within(pagination).getByTestId("next-button");
    expect(previousButton).toBeDefined();
    expect(nextButton).toBeDefined();
  });

  it("should call the previous function when previous button is clicked", () => {
    const pagination = screen.getByRole("region", { name: /pagination/i });
    const previousButton = within(pagination).getByTestId("previous-button");
    previousButton.click();
    expect(previous).toHaveBeenCalled();
  });

  it("should call the next function when next button is clicked", () => {
    const pagination = screen.getByRole("region", { name: /pagination/i });
    const nextButton = within(pagination).getByTestId("next-button");
    nextButton.click();
    expect(next).toHaveBeenCalled();
  });
});
