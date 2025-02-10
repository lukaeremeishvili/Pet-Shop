export default function validateTextarea(text: string) {
  text = text.trim();

  if (text === "") return "cannot be empty!";

  if (text.length < 10) return "must be at least 10 characters long!";

  return null;
}
