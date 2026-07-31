# 🎨 Setyann - Personal Portfolio Website

A modern, responsive portfolio with a dark theme, smooth animations, and optimized performance.

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file (with Font Awesome CDN)
├── css/
│   └── styles.css         # Main styles (18KB, optimized with smooth transitions)
├── js/
│   ├── main.js            # Application entry point
│   └── modules/
│       ├── dom.js         # DOM helper functions
│       ├── navigation.js  # Navigation and menu
│       ├── projects.js    # Projects section
│       └── skills.js      # Skills section
└── README.md              # Documentation (this file)
```

## ✨ Features

- ✅ **Dark Theme** - Beautiful color scheme with cyan accent (#00d4ff)
- ✅ **Font Awesome Icons** - Professional icons via CDN
- ✅ **Smooth Transitions** - Soft and smooth animations (cubic-bezier easing)
- ✅ **Fully Responsive** - Works on all devices (mobile, tablet, desktop)
- ✅ **Modular JavaScript** - Easy to extend architecture
- ✅ **Optimized Performance** - Lazy loading, minified CSS
- ✅ **Accessibility** - ARIA attributes and semantic HTML
- ✅ **SEO Friendly** - Proper semantics and meta tags
- ✅ **CSS Variables** - Easy to customize colors and sizes

## 🚀 Quick Start

### 1. Open in Browser

Simply open the `index.html` file in your browser:
```bash
# Windows (PowerShell)
Start-Process index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 2. Use Local Server (Recommended)

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Then open http://localhost:8000
```

## 🎨 Customization

### Change Colors

Edit CSS variables in `css/styles.css` in the `:root` block:

```css
:root {
    --color-accent: #00d4ff;          /* Main accent color */
    --color-bg-primary: #0a0e27;      /* Main background */
    --color-text-primary: #eaeaea;    /* Main text */
    /* ... other variables */
}
```

### Add Projects

Edit the `projectsData` array in `js/modules/projects.js`:

```javascript
const projectsData = [
    {
        id: 1,
        title: 'My New Project',
        description: 'Project description',
        icon: 'fa-rocket',    // Font Awesome class (https://fontawesome.com/icons)
        tags: ['React', 'CSS3']
    },
    // ... other projects
];
```

Available icons: https://fontawesome.com/icons

### Update Skills

Edit the `skillsData` array in `js/modules/skills.js`:

```javascript
const skillsData = [
    {
        category: 'My Category',
        skills: ['Skill 1', 'Skill 2', 'Skill 3']
    },
    // ... other categories
];
```

### Update Contact Info

In `index.html` find the Contact section and update links:

```html
<a href="mailto:your.email@example.com">Email</a>
<a href="https://github.com/yourprofile">GitHub</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
```

## 📱 Responsive Design

- **Desktop (≥1024px)** - Full layout with two columns in hero section
- **Tablet (768px - 1023px)** - Adapted layout, mobile menu
- **Mobile (< 768px)** - Single column, compact design

## 🔧 JavaScript Architecture

### Modules

1. **dom.js** - DOM helper functions
   - `query()` - Find element
   - `addClass()`, `removeClass()` - Manage classes
   - `create()` - Create elements
   - `on()`, `off()` - Event handlers

2. **navigation.js** - Navigation management
   - Mobile menu toggle
   - Active link state on scroll
   - Scroll effects for navbar

3. **projects.js** - Render projects
   - Dynamic project card creation
   - Technology tags

4. **skills.js** - Render skills
   - Skill categories
   - Skill lists

5. **main.js** - Application entry point
   - Initialize all modules
   - Lazy loading elements
   - Performance monitoring

## 📊 Performance

- **CSS Size**: ~18KB (unminified, includes smooth transitions)
- **JS Size**: ~10KB (all modules together)
- **Zero Dependencies** - Pure HTML5, CSS3, and Vanilla JavaScript
- **Lazy Loading** - Elements load as you scroll
- **Smooth Animations** - Cubic-bezier easing functions for better motion
- **Performance Monitoring** - Built-in page load reporting

## 🌐 Browser Support

- Chrome/Edge ≥ 88
- Firefox ≥ 85
- Safari ≥ 14
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML5
- ARIA attributes for interactive elements
- Keyboard navigation
- Support for reduced motion preference (`prefers-reduced-motion`)

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### GitHub Pages

1. Push files to GitHub
2. Go to Settings → Pages
3. Select branch and folder
4. Done! Your portfolio will be available at `username.github.io`

### Netlify

Simply drag and drop your project folder to [netlify.com](https://netlify.com)

## 📝 License

MIT - Free to use for personal and commercial projects

## 💡 Tips

- Regularly update the projects section with new work
- Add your own social media links to contacts
- Test on mobile devices
- Use Lighthouse to check performance
- Backup before making major changes

---

**Built with ❤️ by Setyann**
