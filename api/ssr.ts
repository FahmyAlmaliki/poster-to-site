import server from "../dist/server/server.js";

export const config = {
  runtime: "edge",
};

export default async function handler(request: Request): Promise<Response> {
  // TanStack Start's server bundle exposes a Fetch API handler.
  // Vercel Edge Functions run on the Fetch API as well.
  return server.fetch(request, {}, {});
}
