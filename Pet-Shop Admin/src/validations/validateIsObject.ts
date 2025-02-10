export default function validateObject(obj: object | null) {
  if (typeof obj !== "object" || obj === null) return "must be selected!";
  return null;
}
