export default function() {
  let str = "";
  for (let value of arguments) {
    if (typeof value !== "string") {
      continue;
    }
    str.length > 0 && (str += " ");
    str += value;
  }
  return str;
}
