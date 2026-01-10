# Troubleshooting GitHub Pages Deployment

## Blank Page Issue

If you're seeing a blank white page at `https://shubhiosys.github.io/gupta/`, follow these steps:

### Step 1: Check GitHub Actions
1. Go to your repository: https://github.com/shubhiosys/gupta
2. Click on the **Actions** tab
3. Check if the latest workflow run completed successfully
4. If it failed, check the error messages

### Step 2: Verify Build Output
The build should create a `dist` folder with:
- `index.html`
- `404.html` (copied from index.html)
- `assets/` folder with JS and CSS files

### Step 3: Check Browser Console
1. Open https://shubhiosys.github.io/gupta/
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Look for any red error messages
5. Common errors:
   - `Failed to load resource` - Asset paths are wrong
   - `404 Not Found` - Files missing from deployment
   - `CORS error` - Configuration issue

### Step 4: Verify Base Path
1. Right-click on the page → **View Page Source**
2. Look for `<script>` tags
3. They should start with `/gupta/assets/...`
4. If they start with `/assets/...` (without `/gupta/`), the base path is wrong

### Step 5: Force Rebuild
1. Make a small change (add a space to README.md)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Force rebuild"
   git push
   ```
3. Wait for the workflow to complete

### Step 6: Clear Cache
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or use incognito/private browsing mode

### Step 7: Test Locally
Test the production build locally:
```bash
npm run build
npm run preview
```
Visit `http://localhost:4173/gupta/` - it should work the same as GitHub Pages

## Common Issues

### Issue: Assets not loading
**Solution**: Ensure `vite.config.js` has `base: '/gupta/'` for production

### Issue: 404 on routes
**Solution**: The workflow should copy `index.html` to `404.html` automatically

### Issue: Build fails
**Solution**: 
- Check Node.js version (should be 18+)
- Run `npm install` locally to check for dependency issues
- Check the Actions log for specific errors

### Issue: Still blank after fixes
**Solution**:
1. Check if GitHub Pages is enabled:
   - Repository → Settings → Pages
   - Source should be "GitHub Actions"
2. Verify the deployment completed:
   - Actions tab → Latest workflow → Should show "Deploy to GitHub Pages" step completed
3. Check the actual deployed files:
   - Visit: https://github.com/shubhiosys/gupta/deployments
   - Click on the latest deployment
   - Verify files are present

## Still Not Working?

If none of the above works:
1. Check the Network tab in browser DevTools
2. See which files are failing to load
3. Verify the file paths match the base path configuration
4. Consider using HashRouter instead of BrowserRouter (though this should work)

