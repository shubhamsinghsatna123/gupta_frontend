# Gupta General Store & Hardware Shop

A modern, responsive website for a local general store and hardware shop.

## Features

- 🏪 Home page with hero section and featured products
- 📦 Products page with filtering and search
- 📂 Categories page
- ℹ️ About page
- 📞 Contact page with map
- ⚙️ Admin panel for product management

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Lucide React (Icons)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Setup Instructions

1. **Create a GitHub Repository**
   - Create a new repository on GitHub (e.g., `gupta` or `gupta-store`)
   - Note your repository name

2. **Update Base Path (if needed)**
   - If your repository name is different from `gupta`, update the base path in `vite.config.js`:
   ```js
   base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
   ```

3. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy on every push to `main` branch

5. **Access Your Website**
   - After deployment, your site will be available at:
   - `https://your-username.github.io/your-repo-name/`
   - The first deployment may take a few minutes

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
```

Then push the `dist` folder to the `gh-pages` branch or use GitHub Actions (recommended).

### Troubleshooting

- **404 errors on routes**: Make sure the base path in `vite.config.js` matches your repository name
- **Assets not loading**: Check that all paths are relative and the base path is correctly set
- **Build fails**: Ensure all dependencies are installed with `npm install`

