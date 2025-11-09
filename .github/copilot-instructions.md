# GitHub Copilot Instructions for Meta Force IT Website

## Project Overview
This is a static HTML website for Meta Force IT, an IT staffing, consulting, and training solutions provider. The site is built with plain HTML, Tailwind CSS, and vanilla JavaScript, and is deployed to GitHub Pages.

## Development Guidelines

### Code Style & Standards
- Use semantic HTML5 elements (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`)
- Follow accessibility best practices (ARIA labels, alt text, keyboard navigation)
- Keep mobile-first responsive design approach
- Use Tailwind CSS utility classes for styling
- Maintain consistent naming conventions (kebab-case for IDs/classes)

### File Structure
```
MetaForceIT/
├── index.html              # Main landing page
├── assets/
│   ├── css/
│   │   └── style.css      # Custom styles
│   ├── js/
│   │   └── main.js        # Main JavaScript file
│   ├── images/            # Image assets
│   └── fonts/             # Custom fonts (if any)
├── .github/
│   ├── workflows/
│   │   └── deploy.yml     # GitHub Actions deployment
│   └── copilot-instructions.md
└── README.md
```

### Responsive Design Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

### SEO Optimization
When adding new pages or content:
1. Include comprehensive meta tags (title, description, keywords)
2. Add Open Graph tags for social sharing
3. Include Twitter Card tags
4. Use structured data (JSON-LD) for rich snippets
5. Ensure proper heading hierarchy (h1 → h2 → h3)
6. Add descriptive alt text to all images
7. Use semantic HTML elements

### Accessibility Requirements
- Maintain WCAG 2.1 AA compliance
- Include ARIA labels for icon-only buttons
- Ensure keyboard navigation works throughout
- Provide text alternatives for non-text content
- Use sufficient color contrast (4.5:1 for normal text)
- Support screen readers
- Include skip-to-main-content link

### Performance Optimization
- Use lazy loading for images (`loading="lazy"`)
- Minimize render-blocking resources
- Preconnect to external domains
- Optimize images (WebP format when possible)
- Minify CSS and JavaScript for production
- Use CDN for external libraries

### JavaScript Guidelines
- Use vanilla JavaScript (no frameworks)
- Follow ES6+ syntax
- Add event listeners after DOM loads
- Implement proper error handling
- Comment complex logic
- Keep functions small and focused
- Use meaningful variable names

### Form Handling
- Validate all user inputs
- Provide clear error messages
- Show success notifications
- Implement real-time validation
- Include CSRF protection if backend integration added
- Sanitize all user inputs

### Git Workflow
1. Create feature branches from `main`
2. Use descriptive commit messages
3. Test changes locally before pushing
4. Create pull requests for review
5. Squash commits before merging

### Commit Message Format
```
type(scope): description

[optional body]
[optional footer]
```

Types: feat, fix, docs, style, refactor, test, chore

Example: `feat(contact): add form validation`

### Testing Checklist
Before pushing changes:
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify mobile responsiveness
- [ ] Check accessibility with screen reader
- [ ] Validate HTML (W3C Validator)
- [ ] Test all forms and interactive elements
- [ ] Verify all links work
- [ ] Check console for errors
- [ ] Test page load performance

### Deployment
- Automatic deployment via GitHub Actions on push to `main`
- Changes go live within 2-5 minutes
- Verify deployment at: https://yourusername.github.io/MetaForceIT/

### Content Updates
When updating content:
1. Maintain brand voice (professional, innovative, trustworthy)
2. Keep paragraphs concise (2-3 sentences)
3. Use action-oriented language
4. Include relevant keywords naturally
5. Update meta descriptions if page content changes significantly

### Adding New Sections
Template for new sections:
```html
<section id="section-name" class="py-16 md:py-24 bg-white">
    <div class="container mx-auto px-4 md:px-6">
        <div class="text-center mb-12 md:mb-16">
            <div class="inline-block mb-4">
                <span class="bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                    SECTION LABEL
                </span>
            </div>
            <h2 class="text-3xl md:text-5xl font-bold text-dark mb-4 md:mb-6">Section Title</h2>
            <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Section description
            </p>
        </div>
        <!-- Section content -->
    </div>
</section>
```

### Color Palette
- Primary: #0066FF (Blue)
- Secondary: #00C9FF (Cyan)
- Accent: #FF6B35 (Orange)
- Dark: #0A1628 (Navy)
- Use these via Tailwind classes: `bg-primary`, `text-secondary`, etc.

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold (700-900)
- Body: Regular (400)
- Small text: 14-16px
- Body text: 16-18px
- Headings: 24-60px (responsive)

### Icons
- Font Awesome 6.4.0
- Use solid style for most icons
- Maintain consistent sizing
- Add `aria-hidden="true"` to decorative icons

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Common Tasks

#### Adding a new page:
1. Create HTML file in root directory
2. Copy header and footer from index.html
3. Add page-specific content
4. Update navigation links
5. Add to sitemap
6. Update meta tags

#### Updating hero content:
- Edit the `#hero-section` in index.html
- Maintain responsive classes
- Update typewriter words in main.js if needed

#### Adding testimonials:
- Follow existing card structure
- Include avatar image (optimized)
- Add 5-star rating
- Keep testimonial text concise (2-3 sentences)

### External Integrations
When adding:
- Google Analytics: Add gtag.js snippet before closing `</head>`
- Contact form backend: Use FormSpree, Netlify Forms, or similar
- Chat widget: Add before closing `</body>`
- Newsletter: Integrate with MailChimp or similar

### Security Best Practices
- Don't commit sensitive data (API keys, passwords)
- Use HTTPS for all external resources
- Implement CSP headers if possible
- Validate all user inputs
- Keep dependencies updated

### Maintenance
- Review and update content quarterly
- Check for broken links monthly
- Update copyright year annually
- Monitor performance with Lighthouse
- Keep dependencies up to date

## Quick Commands

### Local Development
```bash
# Serve locally (use any static server)
npx serve .

# Or use Python
python -m http.server 8000

# Or use PHP
php -S localhost:8000
```

### Validation
```bash
# Validate HTML (install html5validator)
html5validator --root .

# Check links (install linkchecker)
linkchecker http://localhost:8000
```

## Need Help?
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Font Awesome Icons: https://fontawesome.com/icons
- MDN Web Docs: https://developer.mozilla.org
- GitHub Pages Docs: https://docs.github.com/en/pages

## Contact
For questions or support, contact the development team.
