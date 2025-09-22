import { createUser, findUserByEmail } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hash.js";

export async function registerUser(req, reply) {
  const { email, password } = req.body;

  try {
    const existing = await findUserByEmail(req.server.db, email);
    if (existing) {
      return reply.status(400).send({ error: "Email already in use" });
    }

    const hashed = await hashPassword(password);
    const user = await createUser(req.server.db, email, hashed);
    reply.send(user);
  } catch (err) {
    return reply.status(500).send({ error: `Error: ${err.message}` });
  }
}

export async function loginUser(req, reply) {
  const { email, password } = req.body;

  const user = await findUserByEmail(req.server.db, email);
  if (!user) {
    return reply.status(401).send({ error: "Invalid credentials" });
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return reply.status(401).send({ error: "Invalid credentials" });
  }

  const token = req.server.jwt.sign({ id: user.id, email: user.email });
  return { msg: "Login successful", token: token };
}

// export async function registerUser(fastify, { email, password }) {
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const user = await createUser(fastify.db, email, hashedPassword);
//     return { id: user.id, email: user.email };
//   } catch (err) {
//     if (err.code === "23505") {
//       // duplicate email
//       throw fastify.httpErrors.badRequest("Email already registered");
//     }
//     throw err;
//   }
// }

// export async function loginUser(fastify, { email, password }) {
//   const user = await findUserByEmail(fastify.db, email);
//   if (!user) {
//     throw fastify.httpErrors.unauthorized("Invalid email or password");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw fastify.httpErrors.unauthorized("Invalid email or password");
//   }

//   const token = fastify.jwt.sign({ id: user.id, email: user.email });
//   return { token };
// }
