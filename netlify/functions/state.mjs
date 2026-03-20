import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("roadmap");

  if (req.method === "GET") {
    const data = await store.get("trunk", { type: "json" });
    return new Response(JSON.stringify(data ?? null), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "POST") {
    const body = await req.json();
    await store.setJSON("trunk", body);
    return new Response(JSON.stringify({ saved: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/state" };
