import { registerUser, loginUser } from "../controllers/auth.controller.js";

export default async function authRoutes(fastify, opts) {
  // Register
  fastify.post(
    "/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
        },
      },
    },
    registerUser
    // async (request, reply) => {
    //   const result = await registerUser(fastify, request.body);
    //   return { user: result };
    // }
  );

  // LOGIN
  fastify.post(
    "/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
      },
    },
    loginUser
    // async (request, reply) => {
    //   const result = await loginUser(fastify, request.body);
    //   return result;
    // }
  );

  // protected route
  // fastify.get("/profile", { preHandler: [fastify.authenticate] }, profile);
}
