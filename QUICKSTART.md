# Meta Force IT - Quick Start Guide

## 🎯 What I've Created For You

A fully responsive, SEO-optimized website with automatic GitHub Pages deployment!

### ✅ What's Included

1. **Landing Page** (`index.html`)
   - Hero section with typewriter effect
   - Services showcase
   - Client logos
   - Job listings section
   - Testimonials
   - Contact form
   - Fully mobile responsive

2. **SEO & Meta Tags**
   - Comprehensive meta tags
   - Open Graph for social sharing
   - Twitter Cards
   - Structured data (JSON-LD)
   - Semantic HTML

3. **Interactive Features**
   - Mobile menu
   - Smooth scrolling
   - Form validation
   - Typewriter animation
   - Lazy loading images

4. **Auto-Deployment**
   - GitHub Actions workflow
   - Deploys on every push to `main`
   - Live in 2-5 minutes

5. **Documentation**
   - Detailed README
   - GitHub Copilot instructions
   - Development guidelines

## 🚀 Next Steps - Deploy Your Site!

### Step 1: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click the **+** icon (top right) → **New repository**
3. Repository name: `MetaForceIT` (or your preferred name)
4. Make it **Public**
5. **DO NOT** check any boxes (README, .gitignore, license)
6. Click **Create repository**

### Step 2: Push Your Code

Open your terminal in VS Code (Terminal → New Terminal) and run:

```powershell
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Meta Force IT website"

# Add your GitHub repo (REPLACE 'yourusername' with your GitHub username!)
git remote add origin https://github.com/yourusername/MetaForceIT.git

# Push to GitHub
git branch -M main
git push -u origin main
```

> **Note:** Replace `yourusername` with your actual GitHub username!

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source", select **GitHub Actions**
5. That's it! No other settings needed.

### Step 4: Watch Deployment

1. Click the **Actions** tab in your repo
2. You'll see a workflow running "Deploy to GitHub Pages"
3. Wait 1-2 minutes for it to complete (green checkmark)
4. Your site is now live at:
   ```
   https://yourusername.github.io/MetaForceIT/
   ```

## 📝 Important: Update Your URLs

After deployment, you MUST update these URLs in your files:

### In `index.html` (lines 18-29):

Change:
```html
<meta property="og:url" content="https://yourusername.github.io/MetaForceIT/">
<meta name="twitter:url" content="https://yourusername.github.io/MetaForceIT/">
<link rel="canonical" content="https://yourusername.github.io/MetaForceIT/">
```

To your actual URL:
```html
<meta property="og:url" content="https://YOUR-GITHUB-USERNAME.github.io/MetaForceIT/">
<meta name="twitter:url" content="https://YOUR-GITHUB-USERNAME.github.io/MetaForceIT/">
<link rel="canonical" content="https://YOUR-GITHUB-USERNAME.github.io/MetaForceIT/">
```

Then commit and push:
```powershell
git add index.html
git commit -m "Update URLs with actual GitHub Pages URL"
git push
```

## 🎨 Customization Quick Tips

### Change Colors

Edit `index.html` around line 50:

```javascript
colors: {
    'primary': '#0066FF',    // Change to your brand color
    'secondary': '#00C9FF',  // Change to your accent color
    'dark': '#0A1628',       // Change to your dark color
    'accent': '#FF6B35',     // Change to your CTA color
}
```

### Change Typewriter Words

Edit `assets/js/main.js` around line 45:

```javascript
const words = [
    'Your Text 1',
    'Your Text 2',
    'Your Text 3',
    'Your Text 4'
];
```

### Update Company Info

Search and replace in `index.html`:
- "Meta Force IT" → Your company name
- "hello@metaforceit.com" → Your email
- "+1 (555) 123-4567" → Your phone
- "123 Tech Boulevard..." → Your address

### Add Your Logo

Replace lines 83-89 in `index.html`:

```html
<!-- Option 1: Text logo (current) -->
<div class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg">
    <span class="text-white font-bold text-xl">MF</span>
</div>

<!-- Option 2: Image logo -->
<img src="./assets/images/logo.png" alt="Your Company" class="h-10">
```

### Add Images

1. Put images in `assets/images/` folder
2. Reference them like:
   ```html
   <img src="./assets/images/your-image.jpg" alt="Description">
   ```

## 🔧 Testing Locally

### Option 1: VS Code Live Server (Recommended)

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Click "Open with Live Server"
4. Site opens at http://localhost:5500

### Option 2: Python

```powershell
python -m http.server 8000
```
Then open http://localhost:8000

### Option 3: Node.js

```powershell
npx serve .
```

## 📱 Responsive Design

Your site is already fully responsive! Test it:

1. Open site in browser
2. Press `F12` to open DevTools
3. Click the device icon (toggle device toolbar)
4. Try different devices (iPhone, iPad, etc.)

## 🔍 SEO Features Already Included

✅ Meta tags (title, description, keywords)  
✅ Open Graph for Facebook/LinkedIn  
✅ Twitter Cards  
✅ Structured data (JSON-LD)  
✅ Semantic HTML  
✅ Mobile-friendly  
✅ Fast loading  
✅ Accessible (WCAG 2.1 AA)  

### To Improve SEO Further:

1. **Add Google Analytics**
   - Get tracking ID from Google Analytics
   - Add code before `</head>` in index.html

2. **Submit to Search Engines**
   - [Google Search Console](https://search.google.com/search-console)
   - [Bing Webmaster Tools](https://www.bing.com/webmasters)

3. **Create Sitemap**
   - See README.md for sitemap.xml template

## 🎯 Making Changes

Workflow for updates:

1. **Edit files** in VS Code
2. **Test locally** (use Live Server)
3. **Commit changes**:
   ```powershell
   git add .
   git commit -m "Description of what you changed"
   ```
4. **Push to GitHub**:
   ```powershell
   git push
   ```
5. **Auto-deploy** happens (wait 2-5 minutes)
6. **Check live site** for updates

## 🆘 Troubleshooting

### Site not deploying?
- Check Actions tab for errors
- Wait 5-10 minutes after first push
- Verify Pages is enabled in Settings

### Styles not working?
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors

### Images not loading?
- Use relative paths: `./assets/images/image.jpg`
- Check file names (case-sensitive!)
- Make sure images are committed to git

### Mobile menu not working?
- Check browser console for errors
- Make sure main.js is loading

## 📚 Full Documentation

See `README.md` for complete documentation including:
- Detailed customization guide
- SEO optimization tips
- Browser support
- Contributing guidelines

## 🤝 Need Help?

If you encounter issues:

1. Check browser console (F12) for errors
2. Review the README.md
3. Check GitHub Actions logs for deployment errors
4. Search similar issues on GitHub

## 🎉 You're All Set!

Your website is ready to deploy. Follow the steps above and you'll have a live site in minutes!

**Remember:**
1. Create GitHub repo
2. Push your code
3. Enable GitHub Pages
4. Update URLs
5. Customize content

Happy coding! 🚀
