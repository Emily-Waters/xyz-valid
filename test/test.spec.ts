import xyz from "../src";

describe("Parse", () => {
  describe("String", () => {
    it("should parse", () => {
      const s = "string";
      const r = xyz.string().parse(s);

      expect(r).toBe(s);
    });

    it("should throw type error", () => {
      const throwable = () => {
        const x = xyz.string().parse(1);
      };

      expect(throwable).toThrow(/Invalid Type:/);
    });

    it("should allow optional", () => {
      const nonthrowable = () => {
        const r = xyz.string().optional().parse(undefined);
      };

      expect(nonthrowable).not.toThrow();
    });

    it("should throw type error on optional with invalid type", () => {
      const throwable = () => {
        xyz.string().optional().parse(1);
      };

      expect(throwable).toThrow(/Invalid Type:/);
    });
  });

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

  describe("Number", () => {
    it("should parse", () => {
      const n = 5;
      const r = xyz.number().parse(n);

      expect(r).toBe(n);
    });

    it("should throw type error", () => {
      const throwable = () => {
        const n = "5";
        xyz.number().parse(n);
      };

      expect(throwable).toThrow(/Invalid Type:/);

      const throwable2 = () => {
        const n = "5";
        xyz.number().min(1).max(2).parse(n);
      };

      expect(throwable2).toThrow(/Invalid Type:/);
    });

    it("should allow optional", () => {
      const nonthrowable = () => {
        xyz.number().optional().parse(undefined);
      };

      expect(nonthrowable).not.toThrow();
    });

    it("should allow values between min and max range", () => {
      const nonthrowable = () => {
        xyz.number().min(1).max(3).parse(2);
      };

      expect(nonthrowable).not.toThrow();
    });

    it("should throw invalid length error", () => {
      const throwable = () => {
        xyz.number().min(1).max(3).parse(0);
      };

      expect(throwable).toThrow(/Invalid Length:/);

      const throwable2 = () => {
        xyz.number().min(1).max(3).parse(4);
      };

      expect(throwable2).toThrow(/Invalid Length:/);
    });
  });
});
