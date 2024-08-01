import xyz from "../src";

describe("Array", () => {
  it("should parse", () => {
    const s = "a";
    const r = xyz.enum([s, "b", "c"]).parse(s);

    expect(r).toBe(s);
  });

  it("should throw type error", () => {
    const throwable = () => {
      const s = 1;
      const r = xyz.enum(["a", "b", "c"]).parse(s);
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });

  it("should throw invalid enum member error", () => {
    const throwable = () => {
      const s = "z";
      const r = xyz.enum(["a", "b", "c"]).parse(s);
    };

    throwable();
  });
});
