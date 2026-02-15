# Vercel Deployment Guide

## Quick Setup (5 minutes)

### Option 1: Frontend Only (Recommended for Quick Deploy)
If your backend is already hosted elsewhere (Railway, Render, Heroku):

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Framework: **Vite**
   - Root Directory: `.` (default)
   - Click **Deploy**

3. **Add Environment Variables** (in Vercel dashboard)
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com/api`
   - Redeploy

---

### Option 2: Both Frontend & Backend on Vercel

#### A. Deploy Frontend First
1. Go to [vercel.com](https://vercel.com) 
2. Create new project from your GitHub repo
3. Deploy (should auto-detect Vite)

#### B. Deploy Backend as Node.js
1. Create `api/index.js` at root:
   ```bash
   # Move server directory to api
   mkdir -p api
   cp -r server/* api/
   ```

2. Update `api/package.json` to include start script:
   ```json
   {
     "scripts": {
       "start": "node index.js"
     }
   }
   ```

3. Update `vercel.json` to include both:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite",
     "functions": {
       "api/**/*.js": {
         "runtime": "nodejs18.x"
       }
     }
   }
   ```

---

## Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add these variables:

```
VITE_API_URL = https://your-project.vercel.app/api
SUPABASE_URL = your-supabase-url
SUPABASE_ANON_KEY = your-key
SUPABASE_SERVICE_ROLE_KEY = your-key
NODE_ENV = production
```

---

## Frontend API Updates

Your frontend is already set up to use `VITE_API_URL`:

1. In `src/lib/api.ts`, update:
   ```typescript
   const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
   ```

2. Build will include correct API endpoint automatically

---

## Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS instructions
4. Wait 5-10 minutes for SSL cert

---

## Testing Before Deploy

```bash
# Test build locally
npm run build

# Preview production build
npm run preview

# Should show your portfolio at http://localhost:4173
```

---

## Troubleshooting

**"API calls not working"**
- Check `VITE_API_URL` environment variable is set
- Frontend must use correct backend domain
- Verify backend CORS allows Vercel domain

**"Build fails"**
- Check `npm run build` works locally: `npm run build`
- Verify all dependencies in package.json
- Check node version (Vercel uses Node 18+)

**"Blank page"**
- Check browser console for errors
- Verify `dist/index.html` exists after build
- Check Vercel build logs for errors

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Connect repo to Vercel
3. ✅ Set environment variables
4. ✅ Deploy
5. ✅ Test at your Vercel domain

Your portfolio will auto-deploy on every GitHub push! 🚀
