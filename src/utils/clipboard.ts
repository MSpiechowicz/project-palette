export async function copyToClipboard(
  text: string,
  callback: (status: boolean) => void,
) {
  try {
    await navigator.clipboard.writeText(text);
    callback(true);
    setTimeout(() => callback(false), 2000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}
