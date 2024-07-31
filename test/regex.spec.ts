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

  it("should allow values between min and max range", () => {
    const nonthrowable = () => {
      xyz.regex(/ab/).min(1).max(3).parse("ab");
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should throw invalid length error", () => {
    const throwable = () => {
      xyz.regex(/a/).min(2).max(3).parse("a");
    };

    expect(throwable).toThrow(/Invalid Length:/);

    const throwable2 = () => {
      xyz.regex(/abc/).min(1).max(3).parse("abcabc");
    };

    expect(throwable2).toThrow(/Invalid Length:/);
  });
});
