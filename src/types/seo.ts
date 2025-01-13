export interface SEOCheck {
  name: string;
  passed: boolean;
  message: string;
  details: string;
}

export type ContentTone = 
  | 'professional'
  | 'casual'
  | 'friendly'
  | 'formal'
  | 'technical'
  | 'creative';

export interface SEOEntry extends SEOFormData {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface SEOFormData {
  title: string;
  meta_description: string;
  content: string;
  content_html: string;
  content_tone: ContentTone;
  content_keywords: string[];
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  page_url: string;
  featured_image: string;
  branding_name: string; // Added branding name field
}

export const initialFormData: SEOFormData = {
  title: '',
  meta_description: '',
  content: '',
  content_html: '',
  content_tone: 'professional',
  content_keywords: [],
  og_title: '',
  og_description: '',
  og_image: '',
  canonical_url: '',
  page_url: '',
  featured_image: '',
  branding_name: '' // Initialize branding name
};