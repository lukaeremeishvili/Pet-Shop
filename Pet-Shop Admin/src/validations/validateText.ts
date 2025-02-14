export default function validateText(text: string) {
  text = text.trim();

  if (text === "") return "cannot be empty!";

  if (text.length < 3) return "must be at least 3 characters long!";

  return null;
}
