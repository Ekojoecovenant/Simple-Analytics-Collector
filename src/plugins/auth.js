import fp from "fastify-plugin";
import fastifyJwt from "fastify-jwt";
import { config } from "dotenv";
config();

async function auth(fastify, opts) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "supersecret",
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
}

export default fp(auth);
