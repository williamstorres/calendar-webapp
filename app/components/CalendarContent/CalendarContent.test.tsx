import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CalendarContent from "./CalendarContent";

const DAYS_IN_WEEK = 7;
const WEEKS_IN_MONTH = 5;

describe("Calendar component", () => {
  it("render div container", () => {
    render(<CalendarContent />);

    const containerDiv = screen.getByTestId("calendar-container");

    expect(containerDiv).toBeInTheDocument();
  });

  it("render a div for every day of the calendar", async () => {
    render(<CalendarContent />);

    const daysDivs = screen.getAllByRole("calendar-day");

    expect(daysDivs.length).toBe(DAYS_IN_WEEK * WEEKS_IN_MONTH);
  });

  it("render a div for every day of the week as header", async () => {
    render(<CalendarContent />);

    const daysDivs = screen.getAllByRole("calendar-day-header");

    expect(daysDivs.length).toBe(7);
  });
});
