import fp from "fastify-plugin";
import pg from "pg";
import { config } from "dotenv";

const { Pool } = pg;
config();

async function db(fastify, opts) {
  const pool = new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      "postgres://testUser:test@localhost:5432/mydb",
  });

  fastify.decorate("db", pool);
}

export default fp(db);
