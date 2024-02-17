import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from ".";

describe("Loader", () => {
  it("should render the loader", () => {
    render(<Loader />);
    const loader = screen.getByRole("progressbar");
    expect(loader).toBeDefined();
  });
});
