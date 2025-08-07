# Resume Grading Feedback - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Railway (Recommended - Easiest)
Railway is perfect for Node.js apps and offers a generous free tier.

1. **Sign up at [railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Add environment variables:**
   ```
   GOOGLE_SHEET_ID=your_sheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY=your_private_key
   PORT=3000
   ```
4. **Deploy automatically** - Railway will detect it's a Node.js app

### Option 2: Render (Free Tier Available)
Render offers a free tier with automatic deployments.

1. **Sign up at [render.com](https://render.com)**
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add all from `.env`
5. **Deploy**

### Option 3: Heroku (Paid)
Heroku is reliable but requires a paid plan.

1. **Install Heroku CLI**
2. **Create app:** `heroku create your-app-name`
3. **Add environment variables:**
   ```bash
   heroku config:set GOOGLE_SHEET_ID=your_sheet_id
   heroku config:set GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
   heroku config:set GOOGLE_PRIVATE_KEY="your_private_key"
   ```
4. **Deploy:** `git push heroku main`

### Option 4: Vercel (Free Tier)
Vercel is great for frontend but requires serverless functions for backend.

1. **Sign up at [vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Configure as Node.js project**
4. **Add environment variables in Vercel dashboard**
5. **Deploy**

## 🔧 Pre-Deployment Checklist

### 1. Environment Variables
Ensure your `.env` file has all required variables:
```env
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
PORT=3000
```

### 2. Google Sheets Setup
- ✅ Google Sheets API enabled
- ✅ Service account has Editor access to the sheet
- ✅ Sheet has correct column structure

### 3. Code Preparation
- ✅ All files committed to Git
- ✅ `package.json` has correct start script
- ✅ No hardcoded localhost URLs

## 🌐 Domain & SSL

### Custom Domain (Optional)
Most platforms support custom domains:
- **Railway:** Add custom domain in settings
- **Render:** Configure in service settings
- **Heroku:** `heroku domains:add yourdomain.com`

### SSL Certificate
All recommended platforms provide free SSL certificates automatically.

## 📊 Monitoring & Analytics

### Basic Monitoring
- **Railway:** Built-in logs and metrics
- **Render:** Application logs and uptime monitoring
- **Heroku:** Application logs and add-ons

### Error Tracking
Consider adding error tracking:
```bash
npm install @sentry/node
```

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Railway
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: railway/deploy@v1
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
```

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables Not Set**
   - Check platform's environment variable settings
   - Ensure private key is properly formatted

2. **Google Sheets API Errors**
   - Verify service account permissions
   - Check if API is enabled in Google Cloud Console

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies in `package.json`

### Debug Commands
```bash
# Check logs
railway logs
# or
heroku logs --tail

# Test locally
npm start
```

## 📱 Mobile Optimization

The app is already mobile-responsive, but test on:
- iOS Safari
- Android Chrome
- Various screen sizes

## 🔒 Security Considerations

1. **Environment Variables:** Never commit `.env` to Git
2. **CORS:** Configure for your domain
3. **Rate Limiting:** Consider adding rate limiting for production
4. **HTTPS:** All platforms provide SSL by default

## 📈 Scaling

### When to Scale
- Monitor response times
- Check memory usage
- Track concurrent users

### Scaling Options
- **Railway:** Automatic scaling
- **Render:** Manual scaling in paid plans
- **Heroku:** Dyno scaling

## 🎯 Recommended Deployment: Railway

**Why Railway?**
- ✅ Free tier with 500 hours/month
- ✅ Automatic deployments from Git
- ✅ Built-in environment variable management
- ✅ SSL certificates included
- ✅ Easy custom domain setup
- ✅ Great Node.js support

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Add environment variables
7. Deploy!

Your app will be live at `https://your-app-name.railway.app`

## 📞 Support

If you encounter issues:
1. Check platform documentation
2. Review application logs
3. Test locally first
4. Contact platform support if needed

---

**Happy Deploying! 🚀** 