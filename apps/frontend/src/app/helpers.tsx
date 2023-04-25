
export function dataURItoURL(dataURI: string): string {
  // Extract base64-encoded data from data URI
  const base64Data = dataURI.replace(/^data:image\/\w+;base64,/, "");

  // Decode base64-encoded data into binary data
  const binaryData = atob(base64Data);

  // Generate blob URL from binary data
  const blob = new Blob([binaryData], { type: dataURI.split(";")[0].split(":")[1] });
  const url = URL.createObjectURL(blob);

  // Return the generated blob URL
  return url;
}
