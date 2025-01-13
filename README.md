# Elysia Supabase API

A modern, high-performance RESTful API built with Elysia.js and Supabase, providing SEO content management capabilities. This project uses Bun runtime for optimal performance and TypeScript for type safety.

## Features

- ⚡️ **High Performance** - Built with Elysia.js and Bun runtime
- 🔐 **Type Safety** - Full TypeScript support
- 📦 **Supabase Integration** - Robust data persistence
- 🎯 **Clean Architecture** - Using Controllers, Services, and Repositories pattern
- 🔄 **Auto-updating Timestamps** - Automatic handling of created_at and updated_at
- 📝 **SEO Management** - Complete SEO content management system
- 🌐 **CORS Support** - Configured for cross-origin requests
- 📊 **Request Logging** - Built-in request logging with Pino

## Prerequisites

- [Bun](https://bun.sh) installed on your machine
- [Supabase](https://supabase.com) account and project
- Node.js 20+ (for development tools)
- PostgreSQL (provided by Supabase)

## Environment Setup

1. Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=80                  # Optional, defaults to 80
HOST=0.0.0.0            # Optional, defaults to 0.0.0.0
```

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/porameht/elysia-supabase-api.git
cd elysia-supabase-api
```

2. Install dependencies:
```bash
bun install
```

3. Set up the database:
   - Go to your Supabase project
   - Navigate to SQL Editor
   - Run the migration script from `migrations/001_create_seo_entries.sql`

4. Start the development server:
```bash
bun run dev
```

The server will start at http://localhost:3000 (or your configured PORT)

## API Documentation

### Health Check
```http
GET /health
```
Returns server status and timestamp

### SEO Endpoints
```http
GET /api/seo/:brandingName
```
Retrieves SEO entries for a specific branding name

#### Response Format
```typescript
{
  success: boolean;
  data?: SEOEntry[];
  error?: string;
}
```

## Project Structure

```
├── src/
│   ├── config/         # Configuration files
│   │   └── supabase.ts # Supabase client configuration
│   ├── controllers/    # Route controllers
│   │   └── seo.controller.ts
│   ├── repositories/   # Data access layer
│   │   └── seo.repository.ts
│   ├── services/      # Business logic
│   │   └── seo.service.ts
│   ├── types/         # TypeScript types/interfaces
│   │   ├── content.ts
│   │   └── seo.ts
│   └── index.ts       # Application entry point
├── migrations/        # Database migrations
├── .env              # Environment variables
└── package.json      # Project dependencies
```

## Docker Support

Build the image:
```bash
docker build -t elysia-supabase-api .
```

Run the container:
```bash
docker run -p 80:80 --env-file .env elysia-supabase-api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

For development, the project includes:
- TypeScript configuration
- CORS support
- Request logging with Pino
- Hot reload with `bun run dev`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.