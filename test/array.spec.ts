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

  // it("should throw type error on nested property", () => {
  //   const throwable = () => {
  //     const o = { id: 1 };
  //     const r = xyz.object({ id: xyz.string() }).optional().parse(o);
  //   };

  //   expect(throwable).toThrow(/Invalid Type:/);
  // });

  // it("should allow nested optional properties", () => {
  //   const nonthrowable = () => {
  //     const r = xyz.object({ id: xyz.string().optional() }).parse({});
  //   };

  //   expect(nonthrowable).not.toThrow();
  // });
});
