import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pagination from ".";

const previous = jest.fn();
const next = jest.fn();

describe("Pagination", () => {
  it("should render the pagination", () => {
    render(<Pagination previous={previous} page={1} total={10} next={next} />);
    const previousButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });
  it("should call the previous function", () => {
    render(<Pagination previous={previous} page={1} total={10} next={next} />);
    const previousButton = screen.getByText("Previous");
    previousButton.click();
    expect(previous).toHaveBeenCalled();
  });
  it("should call the next function", () => {
    render(<Pagination previous={previous} page={1} total={10} next={next} />);
    const nextButton = screen.getByText("Next");
    nextButton.click();
    expect(next).toHaveBeenCalled();
  });
});
