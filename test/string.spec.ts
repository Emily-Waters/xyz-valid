import xyz from "../src";

describe("String", () => {
  it("should parse", () => {
    const s = "string";
    const r = xyz.string().parse(s);

    expect(r).toBe(s);
  });

  it("should throw type error", () => {
    const throwable = () => {
      const n = 1 as any;
      const x = xyz.string().parse(n);
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });

  it("should allow optional", () => {
    const nonthrowable = () => {
      const r = xyz.string().optional().parse(undefined);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should allow nullable", () => {
    const nonthrowable = () => {
      const r = xyz.string().nullable().parse(null);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should throw type error on optional with invalid type", () => {
    const throwable = () => {
      xyz.string().optional().parse(1);
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });

  it("should allow values between min and max range", () => {
    const nonthrowable = () => {
      xyz.string().min(1).max(3).parse("aa");
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should throw invalid length error", () => {
    const throwable = () => {
      xyz.string().min(1).max(3).parse("");
    };

    expect(throwable).toThrow(/Invalid Length:/);

    const throwable2 = () => {
      xyz.string().min(1).max(3).parse("aaaa");
    };

    expect(throwable2).toThrow(/Invalid Length:/);
  });
});
