# Namecheap Hosting Options for Ceipal Integration

## Research Summary: Namecheap Hosting Capabilities

### What Namecheap Offers:

1. **Shared Hosting** (Stellar, Stellar Plus, Stellar Business)
   - PHP support (not Node.js)
   - Cannot run `api/jobs.js` directly
   - ❌ Won't work for our Node.js serverless function

2. **WordPress Hosting**
   - PHP-based
   - ❌ Won't work for Node.js

3. **VPS Hosting** (Virtual Private Server)
   - Full server control
   - Can install Node.js
   - ✅ **This works!** But more complex and costs $6.88-38.88/month

4. **Dedicated Servers**
   - Overkill for this project
   - Expensive ($48.88+/month)

---

## ✅ BEST SOLUTION: Hybrid Approach

**Use your Namecheap domain + Free services:**

```
┌─────────────────────────────┐
│   yourdomain.com            │
│   (Namecheap DNS)           │
│   Points to GitHub Pages    │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│   GitHub Pages (FREE)       │
│   - Static HTML/CSS/JS      │
│   - Your website frontend   │
└──────────┬──────────────────┘
           │
           │ API calls
           ↓
┌─────────────────────────────┐
│   Vercel/Netlify (FREE)     │
│   - Node.js backend         │
│   - api/jobs.js             │
│   - Ceipal integration      │
└─────────────────────────────┘
```

### Setup Steps:

1. **Host website on GitHub Pages** (free)
2. **Point your Namecheap domain** to GitHub Pages
3. **Deploy API to Vercel** (free)
4. **Configure CORS** to allow your domain

---

## Configuration Guide

### Step 1: Point Namecheap Domain to GitHub Pages

In Namecheap DNS settings, add these records:

```
Type    Host    Value                           TTL
A       @       185.199.108.153                 Automatic
A       @       185.199.109.153                 Automatic
A       @       185.199.110.153                 Automatic
A       @       185.199.111.153                 Automatic
CNAME   www     yourusername.github.io          Automatic
```

### Step 2: Configure GitHub Pages Custom Domain

1. Go to your GitHub repo settings
2. Pages → Custom domain
3. Enter: `yourdomain.com`
4. Enable "Enforce HTTPS"

### Step 3: Deploy API to Vercel (Free)

```bash
cd C:\AI\MetaForceIT
vercel login
vercel --prod
```

You'll get a URL like: `https://metaforceit-api.vercel.app`

### Step 4: Update API URL in Your Code

Edit `assets/js/ceipal-jobs.js`:

```javascript
getApiUrl() {
    // Production: Vercel API
    if (window.location.hostname.includes('yourdomain.com') || 
        window.location.hostname.includes('github.io')) {
        return 'https://metaforceit-api.vercel.app/api/jobs';
    }
    // Local development
    return 'http://localhost:3000/api/jobs';
}
```

### Step 5: Update CORS in api/jobs.js

```javascript
// Allow your custom domain
res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');
// Or allow all (less secure but easier)
res.setHeader('Access-Control-Allow-Origin', '*');
```

---

## Alternative: PHP Solution on Namecheap

If you want everything on Namecheap shared hosting, I can create a PHP version:

### PHP Backend (`api/jobs.php`):

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Your Ceipal credentials
$username = 'ab@metaforceit.com';
$password = 'Ganesha@123';

// Cache file
$cacheFile = 'cache/jobs.json';
$cacheTime = 15 * 60; // 15 minutes

// Check cache
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
    echo file_get_contents($cacheFile);
    exit;
}

// Login to Ceipal
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://talenthirecls2.ceipal.com/login');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'username' => $username,
    'password' => $password
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt');
curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies.txt');
$loginResponse = curl_exec($ch);

// Fetch jobs
curl_setopt($ch, CURLOPT_URL, 'https://talenthirecls2.ceipal.com/JobPosts/index');
curl_setopt($ch, CURLOPT_POST, 0);
$jobsHtml = curl_exec($ch);
curl_close($ch);

// Parse HTML and convert to JSON
// (simplified - you'd need proper HTML parsing)
$jobs = parseJobsFromHtml($jobsHtml);

$result = json_encode([
    'success' => true,
    'data' => $jobs,
    'cached' => false
]);

// Save to cache
file_put_contents($cacheFile, $result);

echo $result;

function parseJobsFromHtml($html) {
    // Parse using DOMDocument or regex
    // Return array of jobs
    return [];
}
?>
```

---

## Cost Comparison

| Solution | Monthly Cost | Complexity | Real-time Updates |
|----------|--------------|------------|-------------------|
| **Namecheap Shared + GitHub Pages + Vercel** | $0 | Low | ✅ Yes |
| **Namecheap Shared + PHP** | $1.98-4.98 | Medium | ✅ Yes |
| **Namecheap VPS** | $6.88+ | High | ✅ Yes |
| **Static JSON (manual)** | $0 | Very Low | ❌ Manual |

---

## Recommendation

**Use your Namecheap domain with GitHub Pages + Vercel (all free):**

✅ Custom domain: `https://yourdomain.com`
✅ Free hosting (GitHub Pages)
✅ Free API backend (Vercel)
✅ Automatic Ceipal integration
✅ SSL certificate included
✅ Easy to maintain

**Total cost: $0/month** (you only pay for domain registration)

---

## Want me to create the PHP version instead?

If you prefer to host everything on Namecheap shared hosting, I can create:
- `api/jobs.php` (PHP version of the API)
- Updated frontend to call PHP endpoint
- Installation guide for Namecheap cPanel

Just let me know!
