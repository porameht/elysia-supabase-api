import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { supabase } from "./config/supabase";
import { SEORepository } from "./repositories/seo.repository";
import { SEOService } from "./services/seo.service";
import { SEOController } from "./controllers/seo.controller";
import pino from 'pino';

// Configure server settings
const port = process.env.PORT || 80;
const host = process.env.HOST || '0.0.0.0';

const logger = pino();

const app = new Elysia()
  .use(cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }))
  .use((app) => {
    app.onRequest((context) => {
      logger.info(`Request: ${context.request.method} ${context.request.url}`);
    });
    return app;
  });

// Initialize dependencies
const seoRepository = new SEORepository(supabase);
const seoService = new SEOService(seoRepository);
const seoController = new SEOController(seoService);

// Register routes
seoController.registerRoutes(app);

// Start the server
app.listen({
  port: port,
  hostname: host,
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
