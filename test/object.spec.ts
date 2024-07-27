import xyz from "../src";

describe("Object", () => {
  it("should parse", () => {
    const o = { id: "string" };
    const r = xyz.object({ id: xyz.string() }).parse(o);

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
      const r = xyz.object({ id: xyz.string() }).optional().parse(undefined);
    };

    expect(nonthrowable).not.toThrow();
  });

  it("should throw type error on nested property", () => {
    const throwable = () => {
      xyz.object({ id: xyz.string() }).optional().parse({ id: 1 });
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });

  it("should allow nested optional properties", () => {
    const nonthrowable = () => {
      xyz.object({ id: xyz.string().optional() }).parse({});
    };

    expect(nonthrowable).not.toThrow();
  });
});
