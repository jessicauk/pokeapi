import {
  describe,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  vi,
  it,
  expect,
} from "vitest";
import { mockMatchMedia } from "../../tests/mocks/mockMatchMedia";
import { render, screen, cleanup } from "@testing-library/react";
import Chart from "./";

describe("Chart", () => {
  beforeAll(() => {
    window.matchMedia = mockMatchMedia(true);
  });

  beforeEach(() => {
    render(<Chart capture={10} happiness={10} />);
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  afterAll(() => {
    window.matchMedia ?? delete window.matchMedia;
  });

  it("should render the chart", () => {
    const chart = screen.getByText("catch");
    expect(chart).toBeDefined();
  });
});
