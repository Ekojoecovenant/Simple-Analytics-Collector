(function () {
  // Grab site key (set by user when adding script)
  var siteKey = window.ANALYTICS_SITE_KEY;
  if (!siteKey) {
    console.error("Analytics: Missing site key");
    return;
  }

  // API endpoint (your fastify backend)
  var API_URL = "https://alphashelf.pxxl.xyz/api/events"; // change to prod later

  // Collect data
  var payload = {
    site_key: siteKey,
    url: window.location.href,
    referrer: document.referrer || null,
  };

  // Send with Fetch (async, non-blocking)
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(function (err) {
    console.error("Analytics: Failed to send event", err);
  });
})();
