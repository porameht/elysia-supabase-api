import { Elysia } from 'elysia';
import { SEOService } from '../services/seo.service';

export class SEOController {
  constructor(private service: SEOService) {}

  registerRoutes(app: Elysia) {
    return app
      .get('/', () => ({
        status: 'Server is running...',
        timestamp: new Date().toISOString()
      }))
      .get('/api/seo/:brandingName', async ({ params }) => {
        try {
          const entries = await this.service.getSEOByBrandingName(params.brandingName);
          return { success: true, data: entries };
        } catch (error) {
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
          };
        }
      });
  }
} 