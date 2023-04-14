import { z } from "zod";
const urlSchema = z.string().url();
export function copyLink(url: string) {
  try {
    const isValid = urlSchema.parse(url);
    if (!isValid) throw new Error("Invalid url");
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert(`Copied url to clipboard`);
      })
      .catch((err) => {
        console.error(`Error copying ${url} to clipboard: ${err}`);
      });
  } catch (error: any) {
    console.log(error.message);
  }
}
