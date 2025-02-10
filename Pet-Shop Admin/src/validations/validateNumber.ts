export default function validateNumber(num: number | string) {
  if (typeof num === "string") return "cannot be empty!";
  if (isNaN(num)) return "must be a valid number!";
  if (num <= 0) return "can't be less then 1!";

  return null;
}
