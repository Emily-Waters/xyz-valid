import xyz from "../src";

describe("Boolean", () => {
  it("should parse", () => {
    const b = true;
    const r = xyz.boolean().parse(b);
  });

  it("should throw type error", () => {
    const throwable = () => {
      const s = "string";
      const r = xyz.boolean().parse(s);
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });
});
