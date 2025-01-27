import { Elysia } from 'elysia';
import { ISEOService } from '../services/seo.service';
import { SEOEntry } from '../types/seo';

export interface ISEOController {
  registerRoutes(app: Elysia): Elysia;
  healthCheck(): { status: string; timestamp: string };
  getSEOByBrandingName(params: { brandingName: string }): Promise<{
    success: boolean;
    data?: SEOEntry[];
    error?: string;
  }>;
  getSEOById(params: { brandingName: string; id: string }): Promise<{ success: boolean; data: SEOEntry }>;
}

export class SEOController implements ISEOController {
  constructor(private service: ISEOService) {}

  public healthCheck() {
    return {
      status: 'Server is running...',
      timestamp: new Date().toISOString()
    };
  }

  public async getSEOByBrandingName(params: { brandingName: string }) {
    try {
      const entries = await this.service.getSEOByBrandingName(params.brandingName);
      return { success: true, data: entries };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  public async getSEOById(params: { brandingName: string, id: string }) {
    const data = await this.service.getSEOById(params.brandingName, params.id);
    return { success: true, data: data };
  }

  registerRoutes(app: Elysia) {
    return app
      .get('/', () => this.healthCheck())
      .get('/api/seo/:brandingName', ({ params }) => this.getSEOByBrandingName(params))
      .get('/api/seo/:brandingName/:id', ({ params }) => this.getSEOById(params));
  }
}