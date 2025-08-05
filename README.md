# Weave Studio Starter Template

A high-performance, accessible starter template for freelance web design projects built with 11ty, Vite, and Decap CMS. Includes modern tooling, automated workflows, and production-ready configurations.

## 🚀 Quick Start

```bash
# Clone the template
git clone https://github.com/your-username/weave-starter-template.git my-project
cd my-project

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Visit `http://localhost:8080` to see your site running.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Customization](#customization)
- [Contributing](#contributing)

## ✨ Features

### Performance & SEO
- ⚡ **Sub-second loading times** with optimized builds
- 🖼️ **Automatic image optimization** (WebP/AVIF generation)
- 📱 **Mobile-first responsive design**
- 🔍 **SEO-ready** with structured data and meta tags
- 🎯 **Core Web Vitals optimized**
- 📊 **Google Lighthouse score 90+**

### Developer Experience
- 🛠️ **Modern build tooling** (11ty + Vite)
- 🎨 **Component-based architecture**
- 🔧 **Hot reload** during development
- 📝 **TypeScript ready** (optional)
- 🧪 **Testing setup** with accessibility checks
- 🚀 **Automated deployments** via GitHub Actions

### Accessibility & Internationalization
- ♿ **WCAG 2.1 AA compliant**
- 🌐 **RTL language support** (Arabic, Hebrew)
- 🎛️ **Keyboard navigation**
- 📖 **Screen reader optimized**
- 🌙 **Dark mode support**
- 🔄 **Language switching**

### Content Management
- 📝 **Decap CMS integration** for non-technical users
- 📚 **Blog system** with tags and categories
- 🖼️ **Media management** with automatic optimization
- 📄 **Flexible page builder** components
- 🎨 **WYSIWYG editor** for rich content

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Static Site Generator** | [11ty](https://www.11ty.dev/) | Fast, flexible builds |
| **Build Tool** | [Vite](https://vitejs.dev/) | Lightning-fast development |
| **CMS** | [Decap CMS](https://decapcms.org/) | Git-based content management |
| **Styling** | CSS3 + PostCSS | Modern CSS with utilities |
| **JavaScript** | ES6+ | Modern JavaScript features |
| **Testing** | Playwright + axe-core | E2E and accessibility testing |
| **CI/CD** | GitHub Actions | Automated workflows |
| **Hosting** | Netlify/Vercel | JAMstack deployment |

## 📁 Project Structure

```
src/
├── _data/           # Global data files
├── _includes/       # Templates and components
│   ├── layouts/     # Page layouts
│   ├── components/  # Reusable components
│   └── partials/    # Small template pieces
├── assets/          # Static assets
│   ├── css/         # Stylesheets
│   ├── js/          # JavaScript files
│   ├── images/      # Images and graphics
│   └── fonts/       # Web fonts
├── pages/           # Static pages
├── blog/            # Blog posts and listings
└── sw.js            # Service worker
```

## 🏃‍♂️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run debug        # Start with debug logging

# Building
npm run build        # Production build
npm run preview      # Preview production build locally

# Quality Assurance
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run test         # Run all tests
npm run test:a11y    # Run accessibility tests
npm run lighthouse   # Run performance audit

# Deployment
npm run deploy       # Deploy to GitHub Pages
npm run deploy:netlify # Deploy to Netlify
```

### Development Workflow

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Create new content**
   - Visit `/admin` for CMS interface
   - Or create markdown files in appropriate directories

3. **Add components**
   - Create in `src/_includes/components/`
   - Add corresponding CSS in `src/assets/css/components/`
   - Include in templates as needed

4. **Test your changes**
   ```bash
   npm run test          # Full test suite
   npm run test:a11y     # Accessibility only
   npm run lighthouse    # Performance audit
   ```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Site Configuration
SITE_URL=http://localhost:8080
SITE_NAME=Your Site Name
CONTACT_EMAIL=your@email.com

# CMS Configuration
DECAP_CMS_BRANCH=main
GITHUB_REPO=your-username/your-repo

# Optional Services
ANALYTICS_ID=your-analytics-id
CONTACT_FORM_ENDPOINT=your-form-endpoint
```

## 🚀 Deployment

### Automated Deployment (Recommended)

The template includes GitHub Actions workflows for automatic deployment:

1. **Push to main branch** triggers build and deploy
2. **Pull requests** trigger preview deployments
3. **Failed builds** send notifications

### Manual Deployment

#### Netlify
```bash
npm run build
npx netlify deploy --prod --dir=_site
```

#### Vercel
```bash
npm run build
npx vercel --prod
```

#### GitHub Pages
```bash
npm run deploy
```

### Pre-deployment Checklist

- [ ] Update site configuration in `src/_data/site.js`
- [ ] Configure environment variables
- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Run accessibility audit: `npm run test:a11y`
- [ ] Check Lighthouse scores: `npm run lighthouse`

## 🎨 Customization

### Quick Customization

1. **Update site information**
   - Edit `src/_data/site.js`
   - Modify `admin/config.yml` for CMS settings

2. **Change colors and fonts**
   - Update CSS custom properties in `src/assets/css/main.css`
   - Add font files to `src/assets/fonts/`

3. **Modify navigation**
   - Edit `src/_data/navigation.js`
   - Update navigation component in `src/_includes/components/navigation.njk`

### Advanced Customization

- **Add new page types**: Create templates in `src/_includes/layouts/`
- **Custom components**: Add to `src/_includes/components/`
- **New CSS utilities**: Extend `src/assets/css/utilities/`
- **JavaScript modules**: Add to `src/assets/js/components/`

See [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for detailed guides.

## 🧪 Testing

### Accessibility Testing
```bash
npm run test:a11y
```
Runs automated accessibility tests using axe-core.

### Performance Testing
```bash
npm run lighthouse
```
Generates Lighthouse performance reports.

### Visual Regression Testing
```bash
npm run test:visual
```
Compares screenshots across different viewports.

## 📚 Documentation

- [Setup Guide](docs/SETUP.md) - Detailed setup instructions
- [Customization Guide](docs/CUSTOMIZATION.md) - How to customize the template
- [Deployment Guide](docs/DEPLOYMENT.md) - Deployment options and configurations
- [Component Library](docs/COMPONENTS.md) - Available components and usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Test additions or updates
- `chore:` Maintenance tasks

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙋‍♂️ Support

- **Documentation**: Check the [docs](docs/) folder
- **Issues**: [GitHub Issues](https://github.com/your-username/weave-starter-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/weave-starter-template/discussions)

## 🌟 Credits

Built with ❤️ by Assaf Yechiel from [Weave Studio](https://weavestudio.dev) for the freelance web development community.

### Acknowledgments

- [11ty](https://www.11ty.dev/) for the amazing static site generator
- [Vite](https://vitejs.dev/) for blazing fast development
- [Decap CMS](https://decapcms.org/) for Git-based content management
- [axe-core](https://github.com/dequelabs/axe-core) for accessibility testing

---

**Star this repo** if you find it helpful!