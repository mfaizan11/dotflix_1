export const encodeId = (id) => {
  return btoa(id.toString())
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};

// Decodes a URL-safe Base64 string back to its original value
export const decodeId = (encodedId) => {
  try {
    // Add padding back if necessary
    let base64 = encodedId.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    return atob(base64);
  } catch (e) {
    console.error("Failed to decode ID:", e);
    return null;
  }
};
