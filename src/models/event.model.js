const schema = "SimpleAnalyticsCollector_01.";

export async function createEvent(db, siteId, url, referrer, userAgent, ip) {
  const query = `
        INSERT INTO ${
          schema ?? ""
        }events (site_id, url, referrer, user_agent, ip_address)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, created_at
    `;
  const values = [siteId, url, referrer, userAgent, ip];
  const { rows } = await db.query(query, values);
  return rows[0];
}

// Count total events
export async function countEventsBySite(db, siteId) {
  const query = `
        SELECT COUNT(*) AS count FROM ${schema ?? ""}events
        WHERE site_id = $1
    `;
  const values = [siteId];
  const { rows } = await db.query(query, values);
  // console.log("Raw Rows count:", rows[0].count);
  return parseInt(rows[0]?.count, 10) || 0;
}

// Top visited URLs
export async function topUrlsBySite(db, siteId, limit = 5) {
  const query = `
        SELECT url, COUNT(*) AS visits
        FROM ${schema ?? ""}events
        WHERE site_id = $1
        GROUP BY url
        ORDER BY visits DESC
        LIMIT $2
    `;
  const values = [siteId, limit];
  const { rows } = await db.query(query, [siteId, limit]);
  return rows;
}

// Referrers
export async function topReferrersBySite(db, siteId, limit = 5) {
  // SELECT COALESCE(referrer, 'direct') AS referrer, COUNT(*) AS visits
  const query = `
        SELECT referrer, COUNT(*) AS visits
        FROM ${schema ?? ""}events
        WHERE site_id = $1
        GROUP BY referrer
        ORDER BY visits DESC
        LIMIT $2
    `;
  const values = [siteId, limit];
  const { rows } = await db.query(query, values);
  return rows;
}

// export async function getEvents(db, siteId) {
//   const query = `
//         SELECT id, site_id, url, ip_address
//         FROM ${schema ?? ""}events
//         ORDER BY id DESC
//     `;
//   const { rows } = await db.query(query);
//   return rows[0];
// }
