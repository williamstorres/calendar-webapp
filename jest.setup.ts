import "@testing-library/jest-dom";
import { parse } from "date-fns/parse";

beforeAll(function () {
  jest.clearAllMocks();
  const date = parse("2024-10-21", "yyyy-MM-dd", new Date());
  jest.useFakeTimers().setSystemTime(date);
});
