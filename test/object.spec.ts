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

  it("should allow nested nullable properties", () => {
    const nonthrowable = () => {
      const o = { a: null };
      const r = xyz.object({ a: xyz.string().nullable() }).parse(o);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should allow nested transformable properties", () => {
    const nonthrowable = () => {
      const o = { a: "1" };
      const r = xyz.object({ a: xyz.string().transform(Number) }).parse(o);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should allow transform", () => {
    const nonthrowable = () => {
      const o = { a: "1" };
      const r = xyz
        .object({ a: xyz.string() })
        .transform((o) => o.a)
        .parse(o);

      expect(r).toBe("1");
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should not throw invalid strict error on optional keys", () => {
    const throwable = () => {
      const o = { a: "string", b: "string" };
      const r = xyz.object({ a: xyz.string(), b: xyz.string(), c: xyz.string().optional() }).strict().parse(o);
    };

    expect(throwable).not.toThrow();
  });

  it("should throw invalid key error when strict", () => {
    const throwable = () => {
      const o = { a: "string", b: "string" };
      const r = xyz.object({ a: xyz.string() }).strict().parse(o);
    };

    expect(throwable).toThrow(/Invalid Key:/);
  });

  it("should not throw invalid key error when not strict", () => {
    const nonthrowable = () => {
      const o = { a: "string", b: "string" };
      const r = xyz.object({ a: xyz.string() }).parse(o);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should compare", () => {
    const nonthrowable = () => {
      const o = { a: "string", b: "string" };
      const r = xyz
        .object({ a: xyz.string(), b: xyz.string() })
        .compare((obj) => {
          return obj.a === obj.b;
        })
        .parse(o);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should throw invalid compare error", () => {
    const throwable = () => {
      const o = { a: "string", b: "other" };
      const r = xyz
        .object({ a: xyz.string(), b: xyz.string() })
        .compare((obj) => obj.a === obj.b)
        .parse(o);
    };

    expect(throwable).toThrow(/Invalid Compare/);
  });

  it("should allow extend", () => {
    const o = { a: "string", b: "string" };
    const original = xyz.object({ a: xyz.string(), b: xyz.string() });
    const o2 = { a: 1, b: "string", c: "string" };
    const ext = original.extend({ a: xyz.number(), c: xyz.string() });

    const r = original.parse(o);
    const r2 = ext.parse(o2);

    expect(r).toMatchObject(o);
    expect(r2).toMatchObject(o2);
  });
});
