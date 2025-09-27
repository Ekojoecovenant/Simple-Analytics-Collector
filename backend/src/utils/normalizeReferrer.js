export function normalizeReferrer(referrer) {
  if (!referrer || referrer.trim() === "") {
    return "direct";
  }

  try {
    const url = new URL(referrer);
    let host = url.hostname.toLowerCase();

    // remove "www.""
    if (host.startsWith("www.")) {
      host = host.slice(4);
    }

    return host;
  } catch (err) {
    // If not a valid URL, just return raw value
    return referrer.toLowerCase();
  }
}
