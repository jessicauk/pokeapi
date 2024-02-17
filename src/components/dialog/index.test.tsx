import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Dialog from ".";

const setOpen = vi.fn();
const image =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";
describe("Dialog", () => {
  beforeEach(() => {
    setOpen.mockClear();
    render(
      <Dialog open={true} setOpen={setOpen} image={image} name="pikachu" />
    );
  });

  afterEach(() => {
    setOpen.mockClear();
    cleanup();
  });

  it("should render the dialog", () => {
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();
  });
  it("should call the onClose function", () => {
    const closeButton = screen.getByText("Close");
    closeButton.click();
    expect(setOpen).toHaveBeenCalled();
  });
});
