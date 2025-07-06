# Protein Powder Comparison App

A Next.js application for comparing protein powder products with AI-powered chat assistance.

## Features

- Product comparison with detailed nutritional information
- AI chat assistant for product recommendations
- Price tracking and updates
- Blog section with articles
- Responsive design with Tailwind CSS

## Security Features

- Environment variables properly configured
- API keys stored securely
- Input validation and sanitization
- XSS protection implemented
- Secure error handling

## Prerequisites

- Node.js 18+ 
- Python 3.8+
- Supabase account
- Google AI API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CurserP3
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Install Python dependencies:
```bash
python setup.py
```

4. Create environment variables:
Create a `.env.local` file with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

5. Set up admin authentication:
```bash
node scripts/setup-admin.js
```

This will create an admin user with:
- Email: admin@example.com
- Password: admin123456

**Important**: Change the default password after first login!

6. Test authentication (optional):
```bash
node scripts/test-auth.js
```

## Security Configuration

### Environment Variables
- Never commit `.env` files to version control
- Use different API keys for development and production
- Rotate API keys regularly
- Use environment-specific configuration

### API Security
- All API keys are server-side only
- Client-side code only uses public keys
- Rate limiting implemented on API routes
- Input validation on all endpoints

### Database Security
- Row Level Security (RLS) enabled
- Service role key only used server-side
- Anonymous key for client-side queries only

## Development

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Security Best Practices

### For Developers
- Never log sensitive information
- Use HTTPS in production
- Implement proper CORS policies
- Validate all user inputs
- Sanitize HTML content
- Use parameterized queries
- Implement rate limiting

### For Deployment
- Use environment variables for all secrets
- Enable security headers
- Implement proper logging
- Monitor for security issues
- Keep dependencies updated
- Use secure hosting providers

## Authentication

The admin dashboard at `/admin` requires authentication. The system uses Supabase Auth for secure email/password authentication.

### Admin Access
- **URL**: `/admin`
- **Default Credentials**: 
  - Email: admin@example.com
  - Password: admin123456
- **Features**: Product management, price updates, admin dashboard

### Security Features
- Protected routes with automatic redirect to login
- Session management with automatic logout
- Secure password handling
- Role-based access control ready

## API Endpoints

- `/api/chat` - AI chat functionality
- `/api/update-prices` - Price update service (uses Python Beautiful Soup)

## Price Updates

**Note**: Price updates require Python and must be run locally. See [LOCAL_PRICE_UPDATES.md](LOCAL_PRICE_UPDATES.md) for detailed instructions.

Quick start:
```bash
# Windows
update_prices.bat

# Mac/Linux
./update_prices.sh

# Manual
python src/lib/scraping/price_scraper.py
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository. 