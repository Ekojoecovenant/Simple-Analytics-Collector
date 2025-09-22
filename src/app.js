import Fastify from "fastify";
import dbPlugin from "./plugins/db.js";
import authPlugin from "./plugins/auth.js";
import authRoutes from "./routes/auth.route.js";

function buildApp(opts = {}) {
  const app = Fastify(opts);

  // Register plugins
  app.register(dbPlugin);
  app.register(authPlugin);

  // Routes
  app.register(authRoutes, { prefix: "/auth" });

  // Test route
  app.get("/", async () => {
    return { msg: "Simple Analytics Collector API" };
  });

  return app;
}

export default buildApp;
