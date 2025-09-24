const STREAM_SERVER_URL = "http://192.168.18.108:5000/geturl";

export async function sniffStream(embedUrl, signal) {
  try {
    const res = await fetch(STREAM_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: embedUrl }),
      signal,
    });

    if (!res.ok) {
      throw new Error("Server error while fetching stream.");
    }

    const data = await res.json();
    return data.streamUrl;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error(
        "⚠️ Server is restarting. Please wait 1 minute and try again."
      );
    }
    throw new Error(`❌ Failed to fetch stream: ${err.message}`);
  }
}
