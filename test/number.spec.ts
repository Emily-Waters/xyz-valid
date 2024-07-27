import xyz from "../src";

describe("Number", () => {
  it("should parse", () => {
    const n = 5;
    const r = xyz.number().parse(n);

    expect(r).toBe(n);
  });

  it("should throw type error", () => {
    const throwable = () => {
      const n = "5";
      xyz.number().parse(n);
    };

    expect(throwable).toThrow(/Invalid Type:/);

    const throwable2 = () => {
      const n = "5";
      xyz.number().min(1).max(2).parse(n);
    };

    expect(throwable2).toThrow(/Invalid Type:/);
  });

  it("should allow optional", () => {
    const nonthrowable = () => {
      xyz.number().optional().parse(undefined);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should allow values between min and max range", () => {
    const nonthrowable = () => {
      xyz.number().min(1).max(3).parse(2);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should throw invalid length error", () => {
    const throwable = () => {
      xyz.number().min(1).max(3).parse(0);
    };

    expect(throwable).toThrow(/Invalid Length:/);

    const throwable2 = () => {
      xyz.number().min(1).max(3).parse(4);
    };

    expect(throwable2).toThrow(/Invalid Length:/);
  });
});
