import xyz from "../src";

describe("Literal", () => {
  it("should parse", () => {
    const l = "literal";
    const r = xyz.literal(l).parse(l);

    expect(r).toBe(l);
  });

  it("should throw a type error", () => {
    const throwable = () => {
      const r = xyz.literal("literal").parse(1);
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });

  it("should throw an invalid literal error", () => {
    const l = "literal";
    const a = "actual";

    const throwable = () => {
      const r = xyz.literal(l).parse(a);
    };

    expect(throwable).toThrow(/Invalid Literal:/);
  });
});
