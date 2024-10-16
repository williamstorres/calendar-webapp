import { setTime } from "./date";

describe("date functions", () => {
  it("set time to date", () => {
    const time = "10:30";
    const date = new Date();

    const result = setTime(date, time);

    expect(result.getHours()).toBe(10);
    expect(result.getMinutes()).toBe(30);
  });

  it("set undefined time to date", () => {
    const date = new Date();

    const result = setTime(date, undefined);

    expect(result).toBe(date);
  });
});
