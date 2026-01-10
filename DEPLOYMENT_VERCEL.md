# Vercel Deployment Guide

## Quick Deploy to Vercel

Your project is now configured to work with **both Vercel and GitHub Pages**!

### For Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Or use the Vercel web interface:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Vercel will auto-detect Vite and deploy

3. **That's it!** Your site will be live at `your-project.vercel.app`

### Configuration

- **Base Path**: `/` (root) - Works automatically with Vercel
- **Build Command**: `npm run build` (default)
- **Output Directory**: `dist`
- **Routing**: Handled by `vercel.json` for client-side routing

### Why Vercel?

- ✅ No base path configuration needed
- ✅ Automatic deployments on git push
- ✅ Free SSL certificate
- ✅ Fast global CDN
- ✅ Easy custom domain setup
- ✅ Preview deployments for pull requests

## For GitHub Pages

If you still want to use GitHub Pages:

1. The workflow will automatically use `BASE_PATH=/gupta/`
2. Your site will be at: `https://shubhiosys.github.io/gupta/`

## Both Platforms

You can deploy to **both** platforms simultaneously:
- **Vercel**: `your-project.vercel.app` (base: `/`)
- **GitHub Pages**: `shubhiosys.github.io/gupta/` (base: `/gupta/`)

Each platform uses the appropriate base path automatically!

