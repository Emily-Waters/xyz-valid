import { array } from "./array";
import { enumValidator } from "./enum";
import { literal } from "./literal";
import { number } from "./number";
import { object } from "./object";
import { regex } from "./regex";
import { string } from "./string";

const xyz = {
  string,
  literal,
  regex,
  number,
  object,
  array,
  enum: enumValidator,
};

export default xyz;
