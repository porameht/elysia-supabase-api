import { SEOEntry } from '../types/seo';

export interface ISEORepository {
  findByBrandingName(brandingName: string): Promise<SEOEntry[]>;
  findById(brandingName: string, id: string): Promise<SEOEntry>;
}

export class SEORepository implements ISEORepository {
  constructor(private supabase: any) {}

  async findByBrandingName(brandingName: string): Promise<SEOEntry[]> {
    const { data, error } = await this.supabase
        .from('seo_entries')
        .select('*')
        .eq('branding_name', brandingName);

    if (error) {
      throw new Error(`Failed to fetch SEO entries: ${error.message}`);
    }

    return data;
  }

  async findById(brandingName: string, id: string): Promise<SEOEntry> {
    const { data, error } = await this.supabase
      .from('seo_entries')
      .select('*')
      .eq('branding_name', brandingName)
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to fetch SEO entry: ${error.message}`);
    }

    return data;
  }
} 