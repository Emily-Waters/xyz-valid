import { XYZType } from "./type";

type Shape = { [x: string]: XYZType };

function create(shape: Shape) {
  class XYZObject<Shape extends { [x: string]: XYZType } = { [x: string]: XYZType }> extends XYZType {
    constructor(public shape: Shape) {
      super();
    }

    parse(input) {
      for (const key in this.shape) {
        this.errors.push(...this.shape[key]._parse(input[key]).errors);
      }

      if (this.errors.length) {
        throw new Error(this.errors.join("\n"));
      }

      return input;
    }
  }

  return new XYZObject(shape);
}

export default { create };
