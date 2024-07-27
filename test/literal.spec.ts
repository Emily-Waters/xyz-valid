import xyz from "../src";

describe("Literal", () => {
  it("should parse", () => {
    const literal = "literal" as const;
    const r = xyz.literal(literal).parse(literal);

    expect(r).toBe(literal);
  });

  it("should throw a type error", () => {
    const throwable = () => {
      const r = xyz.literal("literal").parse(1);
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });

  it("should throw an invalid literal error", () => {
    const literal = "literal" as const;
    const actual = "actual";

    const throwable = () => {
      const r = xyz.literal(literal).parse(actual);
    };

    expect(throwable).toThrow(/Invalid Literal:/);
  });
});
