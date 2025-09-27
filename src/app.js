import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import dbPlugin from "./plugins/db.js";
import authPlugin from "./plugins/auth.js";
import authRoutes from "./routes/auth.route.js";
import siteRoutes from "./routes/site.route.js";
import eventRoutes from "./routes/event.route.js";
import statsRoutes from "./routes/stats.route.js";

import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dbRoutes from "./routes/db.setup.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function buildApp(opts = {}) {
  const app = Fastify(opts);

  // Register plugins
  app.register(dbPlugin);
  app.register(authPlugin);
  // 1. Register the CORS plugin
  app.register(fastifyCors, {
    origin: "*",
    // origin: ['http://localhost:5173', 'https://your-production-domain.com'],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  });

  // Static files
  app.register(fastifyStatic, {
    root: join(__dirname, "../public"),
    prefix: "/public/", // e.g. /public/analytics.js
  });

  // Routes
  app.register(authRoutes, { prefix: "/auth" });
  app.register(siteRoutes, { prefix: "/api/sites" });
  app.register(eventRoutes, { prefix: "/api/events" });
  app.register(statsRoutes, { prefix: "/api/stats" });
  // app.register(dbRoutes, { prefix: "/db/setup" });

  // Test route
  app.get("/", async () => {
    return { msg: "Simple Analytics Collector API" };
  });

  return app;
}

export default buildApp;
