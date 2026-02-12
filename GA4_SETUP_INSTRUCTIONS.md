# 🔧 GA4 MEASUREMENT ID SETUP

## 📋 Cần làm ngay:

### 1️⃣ Get Measurement ID từ GA4:
1. Go to: https://analytics.google.com
2. Create Account → Property
3. Copy Measurement ID (G-XXXXXXXXXX)

### 2️⃣ Update trong 2 files:

#### File 1: index.html (line 20 & 25)
```html
<!-- Thay G-YOUR_ACTUAL_MEASUREMENT_ID bằng ID thật -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ACTUAL_MEASUREMENT_ID"></script>
<script>
  gtag('config', 'G-YOUR_ACTUAL_MEASUREMENT_ID');
</script>
```

#### File 2: src/App.tsx (line 39)
```typescript
// Thay G-YOUR_ACTUAL_MEASUREMENT_ID bằng ID thật
window.gtag('config', 'G-YOUR_ACTUAL_MEASUREMENT_ID', {
  page_path: pagePath
});
```

### 3️⃣ Ví dụ Measurement ID thật:
- G-2X3Y4Z5W6V
- G-H8J7K6L5M4
- G-N1B2V3C4X5

### 4️⃣ Sau khi update:
1. Commit và push code
2. Deploy lại lên Vercel
3. Test tracking trong GA4 Real-time

## 🚨 Error Message Fix:
"Chưa bật tính năng thu thập dữ liệu" → Cần measurement ID thật!

## ✅ Verification:
- Real-time report shows visits
- Page views tracking works
- Button clicks events fire
