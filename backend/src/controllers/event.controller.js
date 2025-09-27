import { createEvent } from "../models/event.model.js";
import { findSiteByKey } from "../models/site.model.js";
import { normalizeReferrer } from "../utils/normalizeReferrer.js";

export async function collectEvent(req, reply) {
  const { site_key, url, referrer } = req.body;

  const cleanReferrer = normalizeReferrer(referrer);

  // Validate site_key exists
  const site = await findSiteByKey(req.server.db, site_key);
  if (!site) {
    return reply.status(400).send({ error: "Invalid site_key" });
  }

  const userAgent = req.headers["user-agent"] || "unknown";
  const ip = req.ip;

  const event = await createEvent(
    req.server.db,
    site.id,
    url,
    cleanReferrer,
    userAgent,
    ip
  );

  reply.code(201).send({ message: "Event collected", event });
}
