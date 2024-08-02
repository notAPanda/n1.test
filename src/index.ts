import { serve } from "@hono/node-server";
import { Context, Hono } from "hono";
import { pdf } from "./app";

const app = new Hono();

app.get("/", (c: Context) => {
  return c.json({
    hello: "there",
  });
});

app.get("/pdf", pdf);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
