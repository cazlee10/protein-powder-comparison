# 🚀 Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Ready
- [ ] All files committed to Git
- [ ] No sensitive data in code (API keys, passwords)
- [ ] `.env` files are in `.gitignore`
- [ ] Build passes locally (`npm run build`)

### ✅ Environment Variables Ready
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `GOOGLE_AI_API_KEY`

### ✅ Security Check
- [ ] Security audit completed
- [ ] Authentication system working
- [ ] Admin user setup script ready
- [ ] No console.log statements with sensitive data

## Deployment Steps

### 1. GitHub Setup
```bash
# Create GitHub repository
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Vercel Setup
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Add environment variables
4. Deploy

### 3. Post-Deployment
1. Set up admin user
2. Test all features
3. Update admin password

## Quick Commands

```bash
# Test build locally
npm run build

# Check for issues
npm run lint

# Test authentication
node scripts/test-auth.js

# Setup admin user
node scripts/setup-admin.js
```

## Your App URLs

- **Main Site**: `https://your-project.vercel.app`
- **Products**: `https://your-project.vercel.app/products`
- **Blog**: `https://your-project.vercel.app/blog`
- **Admin**: `https://your-project.vercel.app/admin`

## Admin Credentials
- **Email**: `admin@example.com`
- **Password**: `admin123456`
- **⚠️ Change password after first login!** 