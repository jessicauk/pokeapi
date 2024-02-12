import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pagination from ".";

describe("Pagination", () => {
  it("should render the pagination", () => {
    render(
      <Pagination
        previous={() => {}}
        page={1}
        total={10}
        next={() => {}}
      />
    );
    const previous = screen.getByText("Previous");
    const next = screen.getByText("Next");
    expect(previous).toBeInTheDocument();
    expect(next).toBeInTheDocument();
  });
});
