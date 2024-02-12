import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dialog from ".";

const setOpen = jest.fn();

describe("Dialog", () => {
  it("should render the dialog", () => {
    render(<Dialog open={true} setOpen={setOpen} image="" name="pikachu" />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });
  it("should call the onClose function", () => {
    render(<Dialog open={true} setOpen={setOpen} image="" name="pikachu" />);
    const closeButton = screen.getByText("Close");
    closeButton.click();
    expect(setOpen).toHaveBeenCalled();
  });
});
