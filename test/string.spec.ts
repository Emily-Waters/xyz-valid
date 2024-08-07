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

  it("should throw invalid min error", () => {
    const throwable = () => {
      xyz.string().min(1).parse("");
    };

    expect(throwable).toThrow(/Invalid Min:/);
  });

  it("should throw invalid max error", () => {
    const throwable = () => {
      xyz.string().max(1).parse("foo");
    };

    expect(throwable).toThrow(/Invalid Max:/);
  });

  it("should throw invalid length error", () => {
    const throwable = () => {
      xyz.string().length(4).parse("foo");
    };

    expect(throwable).toThrow(/Invalid Length:/);
  });

  it("should allow default", () => {
    const defaultValue = "string";
    const r = xyz.string().optional().default(defaultValue).parse(undefined);

    expect(r).toBe(defaultValue);
  });
});
