const schema = "SimpleAnalyticsCollector_01.";

export async function createUser(db, email, hashedPassword) {
  const query = `INSERT INTO ${
    schema ?? ""
  }users (email, password) VALUES ($1, $2) RETURNING id, email, password`;
  const values = [email, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
}

export async function findUserByEmail(db, email) {
  const query = `SELECT * FROM ${schema ?? ""}users WHERE email = $1`;
  const values = [email];
  const result = await db.query(query, values);
  return result.rows[0];
}

// SimpleAnalyticsCollector_01
