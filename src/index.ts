import { array } from "./array";
import { boolean } from "./boolean";
import { enumValidator } from "./enum";
import { literal } from "./literal";
import { number } from "./number";
import { object } from "./object";
import { regex } from "./regex";
import { string } from "./string";

const xyz = {
  array,
  boolean,
  enum: enumValidator,
  literal,
  number,
  object,
  regex,
  string,
};

export default xyz;
