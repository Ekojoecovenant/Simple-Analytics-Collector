import {
  addSite,
  getSiteByKey,
  getSites,
  getSiteStats,
} from "../controllers/site.controller.js";
import {
  createSiteSchema,
  getSiteByKeySchema,
} from "../schemas/site.schema.js";

async function siteRoutes(fastify, opts) {
  fastify.post("/", {
    preHandler: [fastify.authenticate],
    schema: createSiteSchema,
    handler: addSite,
  });

  fastify.get("/", {
    preHandler: [fastify.authenticate],
    handler: getSites,
  });

  fastify.get("/key", {
    preHandler: [fastify.authenticate],
    schema: getSiteByKeySchema,
    handler: getSiteByKey,
  });

  // Stats endpoint
  fastify.get("/:id/stats", {
    preHandler: [fastify.authenticate],
    schema: getSiteByKeySchema,
    handler: getSiteStats,
  });
}

export default siteRoutes;
