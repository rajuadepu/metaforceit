# Meta Force IT Website

[![Deploy to GitHub Pages](https://github.com/yourusername/MetaForceIT/actions/workflows/deploy.yml/badge.svg)](https://github.com/yourusername/MetaForceIT/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Premier IT staffing, consulting, and training solutions provider

**Live Site:** [https://yourusername.github.io/MetaForceIT/](https://yourusername.github.io/MetaForceIT/)

## 🚀 Features

- **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **SEO Optimized** - Comprehensive meta tags, Open Graph, Twitter Cards, and structured data
- **Accessibility Compliant** - WCAG 2.1 AA standards with ARIA labels and keyboard navigation
- **Fast Performance** - Lazy loading, optimized assets, and minimal dependencies
- **Modern UI/UX** - Clean design with Tailwind CSS and smooth animations
- **Auto-Deploy** - Automatic deployment to GitHub Pages via GitHub Actions

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Deployment to GitHub Pages](#deployment-to-github-pages)
- [Development Guide](#development-guide)
- [SEO Optimization](#seo-optimization)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Quick Start

### Prerequisites

- Git installed on your machine
- A GitHub account
- A code editor (VS Code recommended)
- A web browser

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MetaForceIT.git
   cd MetaForceIT
   ```

2. **Open with a local server**
   
   **Option 1: Using VS Code Live Server**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

   **Option 2: Using Python**
   ```bash
   python -m http.server 8000
   ```
   Open http://localhost:8000 in your browser

   **Option 3: Using Node.js**
   ```bash
   npx serve .
   ```

3. **Start developing!**
   - Edit files in your code editor
   - Changes will reflect automatically (with Live Server)
   - All changes are plain HTML/CSS/JS - no build step required

## 📁 Project Structure

```
MetaForceIT/
├── index.html                 # Main landing page
├── assets/
│   ├── css/
│   │   └── style.css         # Custom styles and responsive design
│   ├── js/
│   │   └── main.js           # JavaScript functionality (menu, forms, animations)
│   └── images/               # Image assets (add your images here)
│       ├── favicon-32x32.png
│       ├── favicon-16x16.png
│       ├── apple-touch-icon.png
│       ├── og-image.png      # For social media sharing (1200x630px)
│       └── twitter-card.png  # For Twitter cards (1200x600px)
├── .github/
│   ├── workflows/
│   │   └── deploy.yml        # GitHub Actions workflow for auto-deploy
│   └── copilot-instructions.md # Development guidelines for GitHub Copilot
├── .gitignore                # Git ignore file
├── README.md                 # This file
└── LICENSE                   # MIT License

```

## 🚀 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `MetaForceIT` (or any name you prefer)
3. **Don't** initialize with README, .gitignore, or license (we already have these)

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Meta Force IT website"

# Add remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/MetaForceIT.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under "Source", select:
   - Source: **GitHub Actions**
5. The GitHub Actions workflow will automatically deploy your site

### Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. Watch the deployment workflow run (takes 1-2 minutes)
3. Once complete, your site will be live at:
   ```
   https://yourusername.github.io/MetaForceIT/
   ```

### Step 5: Update URLs

After deployment, update these files with your actual GitHub Pages URL:

1. **index.html** - Update meta tags (lines 18-29):
   ```html
   <meta property="og:url" content="https://yourusername.github.io/MetaForceIT/">
   <meta name="twitter:url" content="https://yourusername.github.io/MetaForceIT/">
   <link rel="canonical" href="https://yourusername.github.io/MetaForceIT/">
   ```

2. **README.md** - Update the live site link at the top

## 🛠️ Development Guide

### Making Changes

1. **Edit files locally**
2. **Test in browser** (using local server)
3. **Commit changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push to GitHub**
   ```bash
   git push origin main
   ```
5. **Auto-deployment** happens via GitHub Actions (1-2 minutes)

### Key Files to Customize

#### `index.html`
- Main content and structure
- Update company information
- Modify sections (services, testimonials, etc.)
- Change contact information

#### `assets/css/style.css`
- Custom styles
- Responsive design adjustments
- Animations and transitions

#### `assets/js/main.js`
- Interactive features
- Form validation
- Typewriter effect words (line 45)
- Mobile menu functionality

### Adding New Pages

1. Create new HTML file (e.g., `about.html`, `services.html`)
2. Copy header and footer from `index.html`
3. Update navigation links in all pages
4. Add page-specific content
5. Update meta tags for SEO

Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Copy meta tags from index.html -->
    <title>About Us - Meta Force IT</title>
    <!-- Update description -->
</head>
<body>
    <!-- Copy header from index.html -->
    
    <!-- Your page content -->
    
    <!-- Copy footer from index.html -->
    
    <!-- Copy scripts from index.html -->
</body>
</html>
```

## 🔍 SEO Optimization

### Current SEO Features

✅ Comprehensive meta tags (title, description, keywords)  
✅ Open Graph tags for Facebook/LinkedIn sharing  
✅ Twitter Card tags for Twitter sharing  
✅ Structured data (JSON-LD) for search engines  
✅ Semantic HTML5 elements  
✅ Descriptive alt text for images  
✅ Canonical URLs  
✅ Mobile-friendly responsive design  
✅ Fast page load times  
✅ Accessible markup (WCAG 2.1 AA)  

### Improving SEO

1. **Add a sitemap** (`sitemap.xml`):
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
           <loc>https://yourusername.github.io/MetaForceIT/</loc>
           <lastmod>2025-11-09</lastmod>
           <priority>1.0</priority>
       </url>
   </urlset>
   ```

2. **Add robots.txt**:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://yourusername.github.io/MetaForceIT/sitemap.xml
   ```

3. **Submit to search engines**:
   - [Google Search Console](https://search.google.com/search-console)
   - [Bing Webmaster Tools](https://www.bing.com/webmasters)

4. **Optimize images**:
   - Use WebP format for better compression
   - Include descriptive alt text
   - Optimize file sizes (use tools like TinyPNG)

5. **Add Google Analytics** (optional):
   ```html
   <!-- Add before closing </head> tag -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## 🎨 Customization

### Colors

Current color scheme (defined in Tailwind config):
- **Primary**: `#0066FF` (Blue) - Main brand color
- **Secondary**: `#00C9FF` (Cyan) - Accent color
- **Accent**: `#FF6B35` (Orange) - Call-to-action color
- **Dark**: `#0A1628` (Navy) - Text and backgrounds

To change colors, update the Tailwind config in `index.html` (line 50):

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#YOUR_COLOR',
                'secondary': '#YOUR_COLOR',
                'dark': '#YOUR_COLOR',
                'accent': '#YOUR_COLOR',
            }
        }
    }
}
```

### Fonts

Current font: **Inter** (Google Fonts)

To change, update in `index.html`:
1. Change Google Fonts link (line 37)
2. Update Tailwind config font family (line 46)

### Logo

Replace the "MF" logo (lines 83-89 in index.html) with your own:

```html
<!-- Option 1: Image logo -->
<img src="./assets/images/logo.png" alt="Meta Force IT" class="h-10">

<!-- Option 2: Keep text logo and customize -->
<div class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg">
    <span class="text-white font-bold text-xl">YL</span>
</div>
```

### Content

Update these sections with your information:

1. **Company name and tagline** (Hero section)
2. **Services** (Services section)
3. **Statistics** (15K+, 500+, 98% - update with real data)
4. **Client logos** (Replace with your client logos)
5. **Testimonials** (Add real testimonials)
6. **Contact information** (Footer and contact form)

### Images

Add your images to `assets/images/` and reference them:

```html
<img src="./assets/images/your-image.jpg" alt="Description" loading="lazy">
```

**Required images:**
- Favicon (32x32, 16x16)
- Apple touch icon (180x180)
- Open Graph image (1200x630)
- Twitter card image (1200x600)

## 🌐 Browser Support

- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Troubleshooting

### Site not deploying?

1. Check GitHub Actions tab for error messages
2. Ensure GitHub Pages is enabled in Settings
3. Verify the branch is set to `main`
4. Wait 5-10 minutes after first push

### Images not loading?

- Use relative paths: `./assets/images/image.jpg`
- Check file names match exactly (case-sensitive)
- Ensure images are committed to git

### Styles not applying?

- Check browser console for errors
- Verify Tailwind CDN is loading
- Clear browser cache (Ctrl+Shift+R)

### Mobile menu not working?

- Check JavaScript console for errors
- Ensure `main.js` is loading correctly
- Verify button IDs match in HTML and JS

## 📱 Testing Checklist

Before deploying major changes:

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices (or use browser dev tools)
- [ ] Verify all links work
- [ ] Test forms and validation
- [ ] Check console for errors
- [ ] Run Lighthouse audit (Performance, SEO, Accessibility)
- [ ] Validate HTML: [W3C Validator](https://validator.w3.org/)
- [ ] Test social media sharing previews

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Inter font family
- [GitHub Pages](https://pages.github.com/) - Free hosting

## 📧 Contact

For questions or support:
- **Email**: hello@metaforceit.com
- **Website**: [https://yourusername.github.io/MetaForceIT/](https://yourusername.github.io/MetaForceIT/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/MetaForceIT/issues)

---

**Built with ❤️ for IT professionals and organizations worldwide**
