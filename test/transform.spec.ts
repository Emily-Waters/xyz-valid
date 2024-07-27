import xyz from "../src";

describe("Transform", () => {
  it("should parse", () => {
    const s = "1";
    const r = xyz
      .string()
      .transform((s) => Number(s))
      .parse(s);

    expect(r).toBe(Number(s));
  });
});
