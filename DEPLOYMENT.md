# GDE Frontend Deployment Guide

This guide explains how to deploy the GDE frontend to Vercel.

## Prerequisites

1. [Vercel account](https://vercel.com/)
2. [GitHub repository](https://github.com) with your frontend code
3. Backend API deployed (see backend deployment guide)

## Environment Variables

Configure these environment variables in your Vercel dashboard:

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://your-backend.koyeb.app` |

### Optional Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_APP_NAME` | `"GDE - Sistema de Gestión"` | Application name |
| `NEXT_PUBLIC_APP_VERSION` | `"2.0.0"` | Application version |
| `NEXT_PUBLIC_THEME` | `"light"` | Default theme |
| `NEXT_PUBLIC_DEBUG` | `false` | Enable debug mode |

## Deployment Steps

### Option 1: Using Vercel Dashboard (Recommended)

1. **Connect GitHub repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (if frontend is in root) or `./GDE-FRONTEND`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Set environment variables:**
   - Add `NEXT_PUBLIC_API_URL` with your backend URL
   - Add other optional variables as needed

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (~2-5 minutes)

### Option 2: Using Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   cd GDE-FRONTEND
   vercel
   ```

4. **Follow prompts:**
   - Link to existing project or create new one
   - Confirm settings
   - Deploy

### Option 3: Using GitHub Integration

1. **Connect Vercel to GitHub:**
   - In Vercel dashboard, go to Settings
   - Connect your GitHub account

2. **Configure auto-deployment:**
   - Every push to main branch will trigger deployment
   - Pull requests create preview deployments
   - Environment variables are inherited from main deployment

## Configuration Files

### vercel.json Configuration

The `vercel.json` file configures:
- Build settings
- Environment variables
- Headers for security
- Rewrites for API proxying
- Redirects

### next.config.mjs Configuration

The Next.js config includes:
- API rewrites for backend communication
- Security headers
- Environment variable handling
- Vercel-specific optimizations

## Domain Configuration

### Using Vercel Domain

1. **Automatic domain:**
   - Vercel provides automatic `.vercel.app` domain
   - Format: `project-name-team.vercel.app`

2. **Custom Vercel domain:**
   - Go to project settings in Vercel dashboard
   - Add custom domain in Domains section

### Using Custom Domain

1. **Add domain to Vercel:**
   - Go to project settings
   - Add your custom domain
   - Configure DNS records as instructed

2. **DNS Configuration:**
   ```
   Type: CNAME
   Name: www (or subdomain)
   Value: cname.vercel-dns.com
   ```

   ```
   Type: A
   Name: @ (root domain)
   Value: 76.76.19.61
   ```

## Environment-Specific Configurations

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_DEBUG=true
```

### Staging
```env
NEXT_PUBLIC_API_URL=https://staging-api.your-domain.com
NEXT_PUBLIC_DEBUG=false
```

### Production
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_DEBUG=false
```

## Post-Deployment

### 1. Verify Deployment

Check these after deployment:

- **Homepage:** `https://your-app.vercel.app/`
- **Login page:** `https://your-app.vercel.app/login`
- **API connectivity:** Test login functionality

### 2. Test API Connection

```javascript
// Test in browser console
fetch('/api/health')
  .then(response => response.json())
  .then(data => console.log('API Status:', data));
```

### 3. Configure Backend CORS

Update backend `ALLOWED_ORIGINS` to include your Vercel URL:

```env
# In your Koyeb backend
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-custom-domain.com
```

## Branch-Based Deployments

### Automatic Deployments

- **Production:** `main` or `master` branch
- **Preview:** All other branches and PRs
- **Development:** Local development

### Manual Deployments

```bash
# Deploy specific branch to production
vercel --prod

# Deploy to preview
vercel

# Deploy with specific environment
vercel --env NEXT_PUBLIC_API_URL=https://staging-api.com
```

## Performance Optimization

### Built-in Optimizations

Vercel automatically provides:
- **Edge Network:** Global CDN
- **Image Optimization:** Automatic WebP conversion
- **Code Splitting:** Optimized bundles
- **Caching:** Smart caching strategies

### Custom Optimizations

1. **Bundle Analysis:**
   ```bash
   npm run build && npm run analyze
   ```

2. **Lighthouse Scores:**
   - Vercel provides automatic Lighthouse audits
   - Check performance scores in deployment dashboard

3. **Edge Functions:**
   ```javascript
   // pages/api/edge-example.js
   export const config = {
     runtime: 'edge',
   }
   
   export default function handler(req) {
     return new Response('Hello from edge!');
   }
   ```

## Monitoring and Analytics

### Vercel Analytics

1. **Enable in dashboard:**
   - Go to project settings
   - Enable Vercel Analytics
   - View metrics in dashboard

2. **Web Vitals:**
   - Core Web Vitals tracking
   - Performance monitoring
   - User experience metrics

### Error Monitoring

```javascript
// pages/_app.js
export function reportWebVitals(metric) {
  // Send to analytics service
  console.log(metric);
}
```

## Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check `NEXT_PUBLIC_API_URL` environment variable
   - Verify backend CORS configuration
   - Test API endpoint directly

2. **Build Failures**
   - Check build logs in Vercel dashboard
   - Verify all dependencies are listed in package.json
   - Ensure TypeScript errors are resolved

3. **Environment Variables Not Loading**
   - Verify variable names start with `NEXT_PUBLIC_`
   - Check deployment environment variable settings
   - Redeploy after adding new variables

4. **Routing Issues**
   - Check Next.js routing configuration
   - Verify rewrites in `vercel.json`
   - Test dynamic routes

### Debug Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs <deployment-url>

# Check project settings
vercel env ls

# Test build locally
npm run build
npm start
```

## Security Considerations

### Headers Configuration

Security headers are configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Environment Variable Security

- Use `NEXT_PUBLIC_` prefix only for client-safe variables
- Keep sensitive data in server-side environment variables
- Never expose API keys or secrets to client

### Authentication Security

- Implement proper JWT token handling
- Use secure cookies for sensitive data
- Implement CSRF protection
- Validate all user inputs

## Backup and Rollback

### Automatic Backups

- Vercel keeps all deployment history
- Easy rollback to previous versions
- Immutable deployments

### Manual Rollback

```bash
# List deployments
vercel ls

# Promote specific deployment to production
vercel promote <deployment-url>
```

## Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Vercel Community:** https://github.com/vercel/vercel/discussions

For deployment issues:
1. Check Vercel dashboard logs
2. Review build output
3. Test locally with production build
4. Contact Vercel support if needed