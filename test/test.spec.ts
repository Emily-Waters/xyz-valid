import xyz from "../src";

describe("Parse", () => {
  describe("String", () => {
    it("should parse", () => {
      const s = "string";
      const r = xyz.string().parse(s);

      expect(r).toBe(s);
    });

    it("should error", () => {
      const throwable = () => {
        const x = xyz.string().parse(1);
      };

      expect(throwable).toThrow();
    });

    it("should allow optional", () => {
      const nonthrowable = () => {
        xyz.string().optional().parse(undefined);
      };

      expect(nonthrowable).not.toThrow();
    });

    it("should error on optional with bad value", () => {
      const throwable = () => {
        xyz.string().optional().parse(1);
      };

      expect(throwable).toThrow();
    });
  });

  describe("Object", () => {
    it("should parse", () => {
      const o = { id: "string" };
      const r = xyz.object({ id: xyz.string() }).parse(o);

      expect(r).toMatchObject(o);
    });

    it("should error", () => {
      const throwable = () => {
        const o = { id: 1 };
        xyz.object({ id: xyz.string() }).parse(o);
      };

      expect(throwable).toThrow();

      const throwable2 = () => {
        const o = {};
        xyz.object({ id: xyz.string() }).parse(o);
      };

      expect(throwable2).toThrow();
    });

    it("should allow optional", () => {
      const nonthrowable = () => {
        xyz.object({ id: xyz.string() }).optional().parse(undefined);
      };

      expect(nonthrowable).not.toThrow();
    });

    it("should error on optional with bad value", () => {
      const throwable = () => {
        xyz.object({ id: xyz.string() }).optional().parse({ id: 1 });
      };

      expect(throwable).toThrow();
    });

    it("should allow nested optional properties", () => {
      const nonthrowable = () => {
        xyz.object({ id: xyz.string().optional() }).parse({});
      };

      expect(nonthrowable).not.toThrow();
    });
  });
});
