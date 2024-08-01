import xyz from "../src";

describe("Array", () => {
  it("should parse", () => {
    const a = ["string"];
    const r = xyz.array(xyz.string()).parse(a);

    expect(r).toMatchObject(a);
  });

  it("should throw type error", () => {
    const throwable = () => {
      const a = [1];
      const r = xyz.array(xyz.string()).parse(a);
    };

    expect(throwable).toThrow(/Invalid Type:/);
  });

  it("should allow optional", () => {
    const nonthrowable = () => {
      const a = ["string", undefined];
      const r = xyz.array(xyz.string().optional()).parse(a);
    };

    expect(nonthrowable).not.toThrow();
  });
});
