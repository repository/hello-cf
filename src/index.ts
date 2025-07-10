import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

const DESIRED_HOST = "hello.interns.workers.dev";

app.use("*", async (c, next) => {
	const currentHost = c.req.header("host");

	if (currentHost !== DESIRED_HOST) {
		const url = new URL(c.req.url);
		url.host = DESIRED_HOST;

		return c.redirect(url.toString());
	}

	await next();
});

const message = `Hello, Austin!

- lily, Isaac, and Aaron
Cloudflare Summer 2025 Interns`;

app.get("/", (c) => {
	return c.text(message);
});

export default {
	fetch: app.fetch,
} satisfies ExportedHandler<Env>;
