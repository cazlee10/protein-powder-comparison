# Deployment Guide

## 🚀 Deploy to Vercel via GitHub

This guide will walk you through deploying your Protein Powder Comparison App to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Your Supabase project configured
- Google AI API key

## Step 1: Push to GitHub

### 1.1 Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `protein-powder-app`)
4. Make it **Public** (required for free Vercel deployment)
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### 1.2 Push Your Code

Run these commands in your project directory:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Connect Vercel to GitHub

1. Go to [Vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository you just created
5. Click "Import"

### 2.2 Configure Environment Variables

In Vercel, add these environment variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

**How to add environment variables in Vercel:**
1. In your project dashboard, go to "Settings" → "Environment Variables"
2. Add each variable one by one
3. Make sure to select all environments (Production, Preview, Development)

### 2.3 Deploy Settings

Configure these settings in Vercel:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 2.4 Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

## Step 3: Post-Deployment Setup

### 3.1 Set Up Admin User

After deployment, you'll need to set up the admin user. You can do this by:

1. **Option A: Use Vercel Functions (Recommended)**
   - Create a new API route for admin setup
   - Call it once to create the admin user

2. **Option B: Run Locally**
   ```bash
   # Clone the deployed repo locally
   git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
   cd REPO_NAME
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.local.example .env.local
   # Edit .env.local with your production values
   
   # Run admin setup
   node scripts/setup-admin.js
   ```

### 3.2 Test Your Deployment

1. Visit your live URL
2. Test the main features:
   - Products page
   - Blog functionality
   - AI chat
   - Admin login (use the credentials from setup)

## Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

## Environment-Specific Configuration

### Production Environment

- Use production Supabase project
- Use production Google AI API key
- Enable all security features
- Set up monitoring and logging

### Development Environment

- Use development Supabase project
- Use development API keys
- Enable debugging features

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check environment variables are set correctly
   - Verify all dependencies are in `package.json`
   - Check for TypeScript errors

2. **Authentication Issues**
   - Verify Supabase URL and keys are correct
   - Check CORS settings in Supabase
   - Ensure admin user is created

3. **API Errors**
   - Check environment variables in Vercel
   - Verify API keys are valid
   - Check function logs in Vercel dashboard

4. **Price Update Issues**
   - **Vercel Limitation**: Price updates require Python which is not available on Vercel
   - The price update feature works locally but not in production on Vercel
   - Consider using a different hosting provider that supports Python (Railway, Heroku, DigitalOcean)
   - Alternative: Run price updates locally and manually update the database

### Debugging

1. **Vercel Function Logs**
   - Go to your project dashboard
   - Click on "Functions" tab
   - Check logs for errors

2. **Environment Variables**
   - Verify all variables are set in Vercel
   - Check for typos in variable names
   - Ensure variables are available in all environments

## Security Checklist

- [ ] Environment variables are set in Vercel
- [ ] `.env` files are not committed to Git
- [ ] Admin user is created with secure password
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Security headers are configured
- [ ] API keys are production-ready

## Monitoring

### Vercel Analytics

1. Enable Vercel Analytics in your project
2. Monitor performance and errors
3. Set up alerts for critical issues

### Supabase Monitoring

1. Monitor database performance
2. Check authentication logs
3. Set up alerts for unusual activity

## Updates and Maintenance

### Deploying Updates

1. Make changes to your code
2. Commit and push to GitHub
3. Vercel will automatically deploy the changes

### Database Migrations

1. Use Supabase migrations for schema changes
2. Test migrations in development first
3. Apply to production carefully

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)

## Your Live URL

Once deployed, your app will be available at:
`https://your-project-name.vercel.app`

**Admin Access:**
- URL: `https://your-project-name.vercel.app/admin`
- Email: `admin@example.com`
- Password: `admin123456` (change after first login!) 