import type { APIRoute } from "astro";
import { createAPIKey } from "../../utils/auth";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  if (!body.username) {
    return new Response(JSON.stringify({
      error: 'Username not specified',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = createAPIKey(body.username)

  return new Response(JSON.stringify({
    apiKey,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
