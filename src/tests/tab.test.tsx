import { render, screen } from "@testing-library/react";
import { Tab } from "../components/tab";

describe("Tab component", () => {
  it("renders the title correctly", () => {
    render(<Tab title="BTC" isActive={true} onClick={() => {}} />);
    expect(screen.getByText("BTC")).toBeInTheDocument();
  });

  it("applies active styles when isActive is true", () => {
    render(<Tab title="BTC" isActive={true} onClick={() => {}} />);
    const tabButton = screen.getByText("BTC");
    expect(tabButton).toHaveClass(
      "border-b-2 border-green-500 font-bold bg-inherit"
    );
    expect(tabButton).not.toHaveClass("bg-white");
  });

  it("applies inactive styles when isActive is false", () => {
    render(<Tab title="BTC" isActive={false} onClick={() => {}} />);
    const tabButton = screen.getByText("BTC");
    expect(tabButton).toHaveClass("font-semibold bg-white");
    expect(tabButton).not.toHaveClass(
      "border-b-2 border-green-500 font-bold bg-inherit"
    );
  });
});
