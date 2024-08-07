import xyz from "../src";

describe("Regex", () => {
  it("should parse", () => {
    const s = "abc";
    const r = xyz.regex(/abc/).parse(s);

    expect(r).toBe(s);
  });

  it("should throw type error", () => {
    const throwable = () => {
      const n = 1 as any;
      const x = xyz.regex(/abc/).parse(n);
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });

  it("should throw invalid regex error", () => {
    const throwable = () => {
      const s = "123";
      const x = xyz.regex(/abc/).parse(s);
    };

    expect(throwable).toThrow(/Invalid Regex:/);
  });

  it("should allow optional", () => {
    const nonthrowable = () => {
      const r = xyz.regex(/abc/).optional().parse(undefined);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should throw type error on optional with invalid type", () => {
    const throwable = () => {
      xyz.regex(/abc/).optional().parse(1);
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });
});
