import { getNumberRounded } from "../utils/get-number-rounded";

describe("getNumberRounded function", () => {
  it("should round a number to the specified decimal place", () => {
    expect(getNumberRounded("3.14159", 2)).toBe("3.14");
    expect(getNumberRounded("7.12345", 3)).toBe("7.123");
  });

  it("should handle decimal places greater than the number of decimal places in the input number", () => {
    expect(getNumberRounded("123.45", 5)).toBe("123.45000");
    expect(getNumberRounded("8.7", 4)).toBe("8.7000");
  });

  it("should handle decimal places less than the number of decimal places in the input number", () => {
    expect(getNumberRounded("123.456", 2)).toBe("123.46");
    expect(getNumberRounded("8.76543", 1)).toBe("8.8");
  });
});
