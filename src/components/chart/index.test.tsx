import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Chart from "./";

describe("Chart", () => {
  it("should render the chart", () => {
    render(<Chart capture={10} happiness={10} />);
    const chart = screen.getByText("Capture & Happiness");
    expect(chart).toBeInTheDocument();
  });
});
