# Ceipal Integration Setup Guide

Complete guide to integrating Ceipal ATS job postings with your Meta Force IT website.

## Architecture Overview

```
┌─────────────────┐
│  GitHub Pages   │
│  (Static Site)  │
└────────┬────────┘
         │
         │ fetch('/api/jobs')
         ↓
┌─────────────────┐
│     Vercel      │
│  (Serverless)   │
└────────┬────────┘
         │
         │ authenticate + fetch
         ↓
┌─────────────────┐
│     Ceipal      │
│   ATS Platform  │
└─────────────────┘
```

## Prerequisites

- [x] Ceipal account with username/password
- [ ] Vercel account (free tier is fine)
- [ ] GitHub repository (MetaForceIT)

## Step 1: Discover Ceipal Authentication

Before deployment, we need to understand how Ceipal handles authentication.

### Method 1: Inspect Browser Network Tab

1. Open https://talenthirecls2.ceipal.com in Chrome
2. Open DevTools (F12) → Network tab
3. Try to log in with your credentials
4. Look for the login request:
   - Request URL (e.g., `/api/auth/login`)
   - Request Method (POST/GET)
   - Form fields (username, password, other params)
   - Response cookies/tokens

### Method 2: Check Ceipal Documentation

1. Contact Ceipal support for API documentation
2. Ask if they provide:
   - REST API endpoints
   - API keys or tokens
   - Developer portal access
   - Webhook capabilities

### Method 3: Inspect HTML Forms

View page source on the login page and find the `<form>` element:

```html
<form action="/path/to/login" method="POST">
    <input name="username" />
    <input name="password" />
    <input name="csrf_token" />
    <!-- Note all field names -->
</form>
```

### What to Look For

Document these details:

```javascript
// Example findings:
{
  loginUrl: 'https://talenthirecls2.ceipal.com/api/auth/login',
  method: 'POST',
  contentType: 'application/json', // or 'application/x-www-form-urlencoded'
  fields: {
    username: 'your_username',
    password: 'your_password',
    // any other required fields
  },
  responseType: 'cookie' // or 'token' or 'session'
}
```

## Step 2: Update API Code

Once you have authentication details, update `api/jobs.js`:

```javascript
// In loginToCeipal function:
async function loginToCeipal(fetch) {
    const username = process.env.CEIPAL_USERNAME;
    const password = process.env.CEIPAL_PASSWORD;
    
    // Update this with actual Ceipal login endpoint
    const loginResponse = await fetch('https://talenthirecls2.ceipal.com/ACTUAL/LOGIN/PATH', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // or 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            // Add any other required fields
        })
    });
    
    // Handle response (cookies, tokens, etc.)
    const cookies = loginResponse.headers.get('set-cookie');
    return cookies;
}
```

## Step 3: Test HTML Parsing

Update the HTML selectors in `parseHtmlJobs()` based on actual Ceipal HTML:

1. Visit https://talenthirecls2.ceipal.com/JobPosts/index
2. Right-click → Inspect Element on the job table
3. Find the exact CSS selectors for:
   - Job rows: `table tbody tr` or `.job-row`
   - Job code: `td:nth-child(2)` or `.job-code`
   - Job title: `td:nth-child(3)` or `.job-title`
   - Location: `td:nth-child(7)` or `.location`

Update `parseHtmlJobs()` with correct selectors:

```javascript
function parseHtmlJobs(html) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    
    const jobs = [];
    
    // UPDATE THESE SELECTORS
    $('#jobsTable tbody tr').each((index, element) => {
        const $row = $(element);
        
        const job = {
            jobCode: $row.find('.job-code').text().trim(),
            title: $row.find('.job-title a').text().trim(),
            location: $row.find('.location').text().trim(),
            // ... add other fields
        };
        
        jobs.push(formatJob(job));
    });
    
    return jobs;
}
```

## Step 4: Deploy to Vercel

### 4.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 4.2 Login to Vercel

```bash
vercel login
```

### 4.3 Deploy

```bash
# From project root (c:\AI\MetaForceIT)
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **metaforceit-api** (or any name)
- Directory? **. (current directory)**
- Override settings? **No**

### 4.4 Add Environment Variables

```bash
vercel env add CEIPAL_USERNAME
# Enter your Ceipal username when prompted

vercel env add CEIPAL_PASSWORD
# Enter your Ceipal password when prompted
```

Or add via Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add:
   - `CEIPAL_USERNAME` = your_username
   - `CEIPAL_PASSWORD` = your_password

### 4.5 Redeploy with Environment Variables

```bash
vercel --prod
```

## Step 5: Update Frontend API URL

Edit `assets/js/ceipal-jobs.js`:

```javascript
getApiUrl() {
    // Production: your Vercel deployment URL
    if (window.location.hostname.includes('github.io')) {
        return 'https://YOUR-PROJECT.vercel.app/api/jobs'; // UPDATE THIS
    }
    // Local development
    return 'http://localhost:3000/api/jobs';
}
```

Replace `YOUR-PROJECT` with your actual Vercel deployment URL.

## Step 6: Deploy to GitHub Pages

```bash
git add .
git commit -m "Add Ceipal integration"
git push origin main
```

GitHub Actions will automatically deploy to GitHub Pages.

## Step 7: Test the Integration

1. Open your GitHub Pages site: `https://yourusername.github.io/MetaForceIT/`
2. Navigate to the Jobs section
3. Check browser console (F12) for logs
4. Verify jobs are loading from Ceipal

## Troubleshooting

### No Jobs Appearing

**Check 1: Browser Console**
```javascript
// Look for errors in console
// Common issues:
// - CORS errors → API not configured correctly
// - 401/403 errors → Authentication failed
// - 500 errors → Server-side error
```

**Check 2: Vercel Logs**
```bash
vercel logs
```

Look for authentication errors or parsing issues.

**Check 3: Test API Directly**

Open: `https://YOUR-PROJECT.vercel.app/api/jobs`

Should return JSON:
```json
{
  "success": true,
  "data": [...],
  "cached": false
}
```

### CORS Errors

Ensure API has correct CORS headers in `api/jobs.js`:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
```

### Authentication Fails

1. Verify credentials in Vercel environment variables
2. Check if Ceipal requires additional fields (CSRF token, etc.)
3. Try logging in manually to ensure credentials work
4. Check if IP whitelisting is required

### HTML Parsing Issues

1. View source of Ceipal job page while logged in
2. Update CSS selectors in `parseHtmlJobs()`
3. Add console.log to see what's being extracted:

```javascript
console.log('Extracted job:', job);
```

## Local Development

### Setup

```bash
# Install dependencies
npm install

# Start local development server
vercel dev
```

### Environment Variables for Local

Create `.env` file:

```env
CEIPAL_USERNAME=your_username
CEIPAL_PASSWORD=your_password
```

**IMPORTANT:** Add `.env` to `.gitignore`!

### Test Locally

1. Start Vercel dev server: `vercel dev`
2. Open `index.html` in browser (use live-server or similar)
3. Jobs should load from `http://localhost:3000/api/jobs`

## Production Checklist

- [ ] Discovered Ceipal authentication mechanism
- [ ] Updated `loginToCeipal()` with correct endpoint
- [ ] Updated `parseHtmlJobs()` with correct selectors
- [ ] Tested HTML parsing locally
- [ ] Deployed to Vercel
- [ ] Added environment variables to Vercel
- [ ] Updated frontend API URL
- [ ] Tested API endpoint directly
- [ ] Deployed to GitHub Pages
- [ ] Verified jobs load on live site
- [ ] Tested search and filter functionality
- [ ] Verified 15-minute caching works

## Security Best Practices

1. **Never commit credentials**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Rotate credentials periodically**
   - Update in Vercel dashboard
   - Redeploy

3. **Monitor API usage**
   - Check Vercel analytics
   - Set up error alerts

4. **Rate limiting**
   - 15-minute cache reduces load
   - Consider implementing rate limits

## Cost Estimate

| Service | Usage | Cost |
|---------|-------|------|
| GitHub Pages | Static hosting | **FREE** |
| Vercel | Serverless functions | **FREE** (100GB-hrs/month) |
| Bandwidth | ~10K requests/month | **FREE** (within limits) |
| **Total** | | **$0/month** |

Vercel free tier is sufficient for most needs.

## Alternative: Netlify Deployment

If you prefer Netlify over Vercel:

1. Create `netlify.toml`:

```toml
[build]
  functions = "api"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

2. Update function path to `api/jobs.js` → `netlify/functions/jobs.js`

3. Deploy:

```bash
netlify deploy --prod
```

## Next Steps

1. **Complete authentication discovery** (Step 1)
2. **Update and test API code** (Step 2-3)
3. **Deploy to Vercel** (Step 4)
4. **Go live** (Step 5-6)

## Support

If you encounter issues:

1. Check Vercel logs: `vercel logs`
2. Test API directly: `https://your-project.vercel.app/api/jobs`
3. Review browser console for frontend errors
4. Contact Ceipal support for API documentation

---

**Need help?** Open an issue or contact the development team.
