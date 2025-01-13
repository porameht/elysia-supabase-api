-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create SEO entries table
CREATE TABLE IF NOT EXISTS seo_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    user_id UUID,
    title TEXT NOT NULL,
    meta_description TEXT,
    content TEXT,
    content_html TEXT,
    content_tone TEXT CHECK (
        content_tone IN (
            'professional',
            'casual',
            'friendly',
            'formal',
            'technical',
            'creative'
        )
    ),
    content_keywords TEXT[],
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    canonical_url TEXT,
    page_url TEXT,
    featured_image TEXT,
    branding_name TEXT NOT NULL
);

-- Create index on branding_name for faster queries
CREATE INDEX idx_seo_entries_branding_name ON seo_entries(branding_name);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_seo_entries_updated_at
    BEFORE UPDATE ON seo_entries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO seo_entries (
    title,
    meta_description,
    content_tone,
    branding_name,
    content_keywords
) VALUES 
(
    'Welcome to Our Website',
    'Discover our amazing products and services. We offer the best solutions for your needs.',
    'professional',
    'sample-brand',
    ARRAY['welcome', 'products', 'services']
),
(
    'About Our Company',
    'Learn about our company history, mission, and values. We are committed to excellence.',
    'formal',
    'sample-brand',
    ARRAY['about', 'company', 'mission', 'values']
);

-- Add comments to the table
COMMENT ON TABLE seo_entries IS 'Stores SEO-related content and metadata for web pages';
COMMENT ON COLUMN seo_entries.id IS 'Unique identifier for each SEO entry';
COMMENT ON COLUMN seo_entries.branding_name IS 'Brand identifier for grouping related SEO entries';
COMMENT ON COLUMN seo_entries.content_tone IS 'Defines the writing style of the content';
COMMENT ON COLUMN seo_entries.content_keywords IS 'Array of keywords relevant to the content';