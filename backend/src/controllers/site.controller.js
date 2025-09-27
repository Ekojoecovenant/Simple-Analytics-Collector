import {
  countEventsBySite,
  topReferrersBySite,
  topUrlsBySite,
} from "../models/event.model.js";
import {
  createSite,
  findSiteByIdAndUser,
  findSiteByKey,
  listSitesByUser,
} from "../models/site.model.js";
import crypto from "crypto";

export async function addSite(req, reply) {
  const { name } = req.body;
  const userId = req.user.id;

  const siteKey = crypto.randomBytes(16).toString("hex");

  const site = await createSite(req.server.db, userId, name, siteKey);
  reply.send(site);
}

export async function getSites(req, reply) {
  const userId = req.user.id;
  const sites = await listSitesByUser(req.server.db, userId);
  reply.send(sites);
}

export async function getSiteByKey(req, reply) {
  const { site_key } = req.query;
  const userId = req.user.id;

  const site = await findSiteByKey(req.server.db, site_key);
  // console.log(site);
  // console.log(`Site User: ${site.user_id}\nCurrent User: ${userId}`);
  if (!site || site.user_id !== userId) {
    return reply.status(404).send({ error: "Site not found" });
  }
  // const userSites = await listSitesByUser(req.server.db, userId);
  // const site =
  //   userSites.find((userSite) => site_key === userSite.site_key) ?? {};
  reply.send(site);
}

// STATS
export async function getSiteStats(req, reply) {
  const id = +req.params.id;
  const userId = req.user.id;

  // verify site belongs to this user
  const site = await findSiteByIdAndUser(req.server.db, id, userId);
  if (!site) {
    return reply.status(404).send({ error: "Site not found" });
  }
  const total = await countEventsBySite(req.server.db, id);
  const urls = await topUrlsBySite(req.server.db, id);
  const referrers = await topReferrersBySite(req.server.db, id);

  reply.send({
    site: site.rows,
    stats: {
      total_events: total,
      top_urls: urls,
      top_referrers: referrers,
    },
  });
}
