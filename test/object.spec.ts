import xyz from "../src";

describe("Object", () => {
  it("should parse", () => {
    const o = { string: "string", number: 1, literal: "literal" };
    const r = xyz.object({ string: xyz.string(), number: xyz.number(), literal: xyz.literal("literal") }).parse(o);

    expect(r).toMatchObject(o);
  });

  it("should throw type error", () => {
    const throwable = () => {
      const o = { id: 1 };
      const r = xyz.object({ id: xyz.string() }).parse(o);
    };

    expect(throwable).toThrow(/Invalid Type:/);

    const throwable2 = () => {
      const o = {};
      const r = xyz.object({ id: xyz.string() }).parse(o);
    };

    expect(throwable2).toThrow(/Invalid Type:/);
  });

  it("should allow optional", () => {
    const nonthrowable = () => {
      const u = undefined;
      const r = xyz.object({ id: xyz.string() }).optional().parse(u);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should throw type error on nested property", () => {
    const throwable = () => {
      const o = { id: 1 };
      const r = xyz.object({ id: xyz.string() }).parse(o);
    };

    expect(throwable).toThrow(/Invalid Type:/);

    const throwable2 = () => {
      const o = { id: 1 };
      const r = xyz.object({ id: xyz.string() }).optional().parse(o);
    };

    expect(throwable2).toThrow(/Invalid Type:/);
  });

  it("should allow nested optional properties", () => {
    const nonthrowable = () => {
      const o = {};
      const r = xyz.object({ id: xyz.string().optional() }).parse(o);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should throw invalid strict error", () => {
    const throwable = () => {
      const o = { a: "string", b: "string" };
      const r = xyz.object({ a: xyz.string() }).strict().parse(o);
    };

    expect(throwable).toThrow(/Invalid Strict Object:/);

    const throwable2 = () => {
      const o = { a: "string", b: "string" };
      const r = xyz.object({ a: xyz.string(), b: xyz.string(), c: xyz.string() }).strict().parse(o);
    };

    expect(throwable2).toThrow(/Invalid Strict Object:/);
  });

  it("should not throw invalid strict error on optional keys", () => {
    const throwable = () => {
      const o = { a: "string", b: "string" };
      const r = xyz.object({ a: xyz.string(), b: xyz.string(), c: xyz.string().optional() }).strict().parse(o);
    };

    expect(throwable).not.toThrow();
  });
});
