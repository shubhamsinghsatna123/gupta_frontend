# GitHub Pages Deployment Guide

## Quick Start

1. **Create GitHub Repository**
   - Repository name: `gupta` (or any name you prefer)
   - Make it public (required for free GitHub Pages)

2. **Update Base Path** (if repository name is NOT "gupta")
   - Open `vite.config.js`
   - Change `/gupta/` to `/{your-repo-name}/`
   - Example: If repo is `my-store`, change to `/my-store/`

3. **Initialize Git and Push**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to: Repository → Settings → Pages
   - Source: Select **"GitHub Actions"**
   - Save

5. **Wait for Deployment**
   - Go to: Repository → Actions tab
   - Wait for the workflow to complete (usually 2-3 minutes)
   - Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Important Notes

- **Repository Name**: The base path in `vite.config.js` must match your repository name
- **First Deployment**: May take 5-10 minutes
- **Automatic Updates**: Every push to `main` branch will trigger a new deployment
- **Custom Domain**: You can add a custom domain in Settings → Pages

## Troubleshooting

### 404 Errors on Routes
- Ensure base path in `vite.config.js` matches your repository name
- Check that GitHub Actions workflow completed successfully

### Assets Not Loading
- Verify the base path is correct
- Clear browser cache
- Check browser console for errors

### Build Fails
- Check Actions tab for error messages
- Ensure `package.json` has all dependencies
- Try running `npm install` and `npm run build` locally first

## Testing Locally Before Deploying

Test the production build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to see how it will look on GitHub Pages.

