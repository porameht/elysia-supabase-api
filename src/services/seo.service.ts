import { ISEORepository } from '../repositories/seo.repository';
import { SEOEntry } from '../types/seo';

export interface ISEOService {
  getSEOByBrandingName(brandingName: string): Promise<SEOEntry[]>;
  getSEOById(brandingName: string, id: string): Promise<SEOEntry>;
}

export class SEOService implements ISEOService {
  constructor(private repository: ISEORepository) {}

  async getSEOByBrandingName(brandingName: string): Promise<SEOEntry[]> {
    return await this.repository.findByBrandingName(brandingName);;
  }

  async getSEOById(brandingName: string, id: string): Promise<SEOEntry> {
    return await this.repository.findById(brandingName, id);
  }
} 