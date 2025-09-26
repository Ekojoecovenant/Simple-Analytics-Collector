const schema = "SimpleAnalyticsCollector_01.";

export async function createSite(db, userId, name, siteKey) {
  const query = `
        INSERT INTO ${schema ?? ""}sites (user_id, name, site_key)
        VALUES ($1, $2, $3)
        RETURNING id, name, site_key, created_at
    `;
  const values = [userId, name, siteKey];
  const { rows } = await db.query(query, values);
  return rows[0];
}

export async function listSitesByUser(db, userId) {
  const query = `
        SELECT id, name, site_key, created_at FROM ${schema ?? ""}sites
        WHERE user_id = $1
    `;
  const values = [userId];
  const { rows } = await db.query(query, values);
  return rows;
}

export async function findSiteByKey(db, siteKey) {
  const query = `SELECT * FROM ${schema ?? ""}sites WHERE site_key = $1`;
  const values = [siteKey];
  const { rows } = await db.query(query, values);
  return rows[0];
}

export async function findSiteByIdAndUser(db, siteId, userId) {
  const query = `SELECT * FROM ${
    schema ?? ""
  }sites WHERE id = $1 AND user_id = $2`;
  const values = [siteId, userId];
  const { rows } = await db.query(query, values);
  return rows[0];
}
