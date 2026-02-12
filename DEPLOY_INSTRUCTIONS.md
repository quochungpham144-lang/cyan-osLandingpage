# 🚀 VERCEL DEPLOY INSTRUCTIONS

## 📋 Bước 1: Deploy lên Vercel

### 1️⃣ Go to Vercel:
- URL: https://vercel.com
- Sign up với GitHub account

### 2️⃣ Import Repository:
1. Click "New Project"
2. Select: `quochungpham144-lang/cyan-osLandingpage`
3. Click "Import"

### 3️⃣ Configure:
- Framework: **Vite** (auto-detect)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 4️⃣ Deploy:
- Click "Deploy"
- Wait 2-3 minutes
- Get URL: `https://cyan-os-translation.vercel.app`

## 📊 Bước 2: Test GA4 Tracking

### 1️⃣ Open Production URL:
```
🌐 https://cyan-os-translation.vercel.app
```

### 2️⃣ Check GA4 Real-time:
1. Go to: https://analytics.google.com
2. Select Property: "Cyan OS Website"
3. Click "Real-time"
4. Should see your visit within 1-2 minutes

### 3️⃣ Test Events:
- Click "Experience Natural Voice" button
- Click "Get Started" buttons
- Check GA4 Events tab

## ✅ Expected Results:

### GA4 Real-time should show:
- ✅ Users online: >0
- ✅ Page views: tracking
- ✅ Events: cta_click, pricing_click
- ✅ No error messages

### If still not working:
- Wait 5-10 minutes
- Clear browser cache
- Check browser console for errors
- Verify production URL loads

## 🎯 Success Indicators:

### GA4 Dashboard:
- ✅ "Data collection" status: Active
- ✅ Real-time users: >0
- ✅ Page views: counting
- ✅ Events: firing correctly

### Website:
- ✅ Loads at production URL
- ✅ All buttons work
- ✅ No console errors
- ✅ GA4 script loaded

## 🚨 Troubleshooting:

### If GA4 still shows "no data":
1. Check production URL loads correctly
2. Verify GA4 script in source code
3. Check browser console for errors
4. Wait 10-15 minutes for data to appear
5. Contact support if needed

## 🎉 Next Steps:

After tracking works:
1. Setup conversion goals
2. Create custom reports
3. Configure UTM parameters
4. Start marketing campaigns
