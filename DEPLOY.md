# Deploying LP Nexus to Render.com

This guide walks you through deploying LP Nexus to Render.com.

## Prerequisites

- [Render.com account](https://render.com) (free tier available)
- GitHub repository with LP Nexus code pushed
- API keys for:
  - [WalletConnect](https://cloud.walletconnect.com) (required)
  - [Alchemy](https://alchemy.com) or [Infura](https://infura.io) (required for EVM RPC)
  - [Helius](https://helius.xyz) (required for Solana RPC)

## Deployment Steps

### 1. Push Code to GitHub

Ensure your latest code is on the main branch:

```bash
git add .
git commit -m "chore: add render.yaml and health check"
git push origin main
```

### 2. Create New Web Service on Render

**Option A: Using Blueprint (Recommended)**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create the service
5. Click **"Apply"** to deploy

**Option B: Manual Setup**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `lp-nexus`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter ($7/month) or Free

### 3. Configure Environment Variables

After creating the service, add these environment variables in the Render dashboard:

**Required:**
```
NODE_ENV=production
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_key
```

**Optional (for user data sync):**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Deploy

1. Click **"Create Web Service"**
2. Render will automatically build and deploy
3. First deployment takes ~5-10 minutes (installs dependencies + builds)
4. Subsequent deployments take ~2-3 minutes

### 5. Verify Deployment

Once deployed, verify:

1. **Health Check**: Visit `https://your-app.onrender.com/api/health`
   - Should return: `{"status":"healthy",...}`

2. **Main App**: Visit your app URL
   - Wallet connection should work
   - Position discovery should fetch data

3. **Check Logs**: In Render dashboard → your service → Logs
   - Look for any errors during startup

## Troubleshooting

### Build Failures

**Issue**: `npm install` fails or takes too long
**Solution**: 
- Ensure `package-lock.json` is committed
- Try clearing build cache: Settings → Clear Build Cache → Deploy

**Issue**: `next build` fails with TypeScript errors
**Solution**:
```bash
# Local check before pushing
npm run build
```

### Runtime Errors

**Issue**: Wallet connection not working
**Solution**:
- Check `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set correctly
- Ensure project ID is valid at cloud.walletconnect.com

**Issue**: Position discovery failing
**Solution**:
- Verify RPC API keys (Alchemy/Infura/Helius) are set
- Check subgraph is accessible from Render's servers

**Issue**: PWA not working
**Solution**:
- PWA requires HTTPS (Render provides this automatically)
- Check browser console for service worker errors

### Performance Issues

**Issue**: App is slow
**Solution**:
- Upgrade to Standard plan ($25/month) for better CPU
- Enable caching in Render dashboard
- Consider adding Redis (see `render.yaml` optional services)

## Custom Domain (Optional)

1. In Render dashboard → your service → Settings → Custom Domain
2. Add your domain (e.g., `lpnexus.yourdomain.com`)
3. Follow DNS instructions provided by Render
4. SSL certificate is automatically provisioned

## Monitoring

**Render Dashboard**:
- CPU/Memory usage graphs
- Request logs
- Deployment history

**Health Check Endpoint**:
```
GET /api/health
```

Returns service status and timestamp.

## Costs

**Free Tier**:
- Web services sleep after 15 min of inactivity
- Limited bandwidth (100GB/month)
- Good for testing

**Starter Plan** ($7/month):
- Always-on service
- 512MB RAM, 0.5 CPU
- Perfect for production

**Standard Plan** ($25/month):
- 2GB RAM, 1 CPU
- Better for high traffic

## Security Best Practices

1. **Never commit `.env` files** (already in `.gitignore`)
2. **Use separate API keys** for production vs development
3. **Restrict RPC key origins** to your Render domain only
4. **Enable 2FA** on Render and API provider accounts
5. **Monitor API usage** to detect abuse

## Post-Deployment Checklist

- [ ] App loads without errors
- [ ] Wallet connection works
- [ ] Position discovery fetches data
- [ ] IL simulator runs correctly
- [ ] PWA installs on mobile/desktop
- [ ] Health check endpoint responds
- [ ] Custom domain configured (optional)
- [ ] Analytics/monitoring set up (optional)

## Rollback

If deployment fails:

1. Go to Render dashboard → your service → Deploys
2. Find the last working deployment
3. Click **"Manual Deploy"** → **"Deploy existing commit"**

## Support

- **Render Docs**: https://render.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **LP Nexus Issues**: Open issue on GitHub repository
