import { findSiteByIdAndUser } from "../models/site.model.js";
const schema = "SimpleAnalyticsCollector_01.";

export async function getSiteStatus(req, reply) {
  const id = +req.params.id;
  const db = req.server.db;
  const userId = req.user.id;

  try {
    // verify site belongs to this user
    const site = await findSiteByIdAndUser(req.server.db, id, userId);
    if (!site) {
      return reply.status(404).send({ error: "Site not found" });
    }

    // Total visits
    const totalVisitsQuery = `
        SELECT COUNT(*) AS total
        FROM ${schema ?? ""}events
        WHERE site_id = $1
    `;
    const { rows: totalRows } = await db.query(totalVisitsQuery, [id]);
    const totalVisits = parseInt(totalRows[0].total, 10);

    // Top referrers
    const topReferrersQuery = `
        SELECT referrer AS referrer, COUNT(*) AS count
        FROM ${schema ?? ""}events
        WHERE site_id = $1
        GROUP BY referrer
        ORDER BY count DESC
        LIMIT 5
    `;
    const { rows: referrerRows } = await db.query(topReferrersQuery, [id]);

    // Top pages
    const topPagesQuery = `
        SELECT url, COUNT(*) AS count
        FROM ${schema ?? ""}events
        WHERE site_id = $1
        GROUP BY url
        ORDER BY count DESC
        LIMIT 5
    `;
    const { rows: pageRows } = await db.query(topPagesQuery, [id]);

    return reply.send({
      site: site,
      total_visits: totalVisits,
      top_referrers: referrerRows,
      top_pages: pageRows,
    });
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ error: "Failed to fetch site stats" });
  }
}

// Stopped here...remember to regenerate ChatGBt official response...before you started this shii
