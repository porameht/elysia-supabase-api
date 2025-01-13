import { ISEORepository } from '../repositories/seo.repository';
import { SEOEntry } from '../types/seo';

export class SEOService {
  constructor(private repository: ISEORepository) {}

  async getSEOByBrandingName(brandingName: string): Promise<SEOEntry[]> {
    return await this.repository.findByBrandingName(brandingName);;
  }
} 