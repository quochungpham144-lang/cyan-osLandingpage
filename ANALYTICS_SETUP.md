# 📊 ANALYTICS & TRACKING SETUP GUIDE

## 🔧 GOOGLE ANALYTICS 4 (GA4) SETUP

### 1. **Tạo Google Analytics Property**
- Truy cập: https://analytics.google.com
- Create Account → Property
- Property Name: "Cyan AI Translation"
- Reporting Time Zone: Your timezone
- Currency: USD

### 2. **Get Measurement ID**
- Go to Admin → Property Settings
- Copy "Measurement ID" (G-XXXXXXXXXX)
- Replace `GA_MEASUREMENT_ID` in index.html

### 3. **Update index.html**
```html
<!-- Thay GA_MEASUREMENT_ID bằng ID thực tế của bạn -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_MEASUREMENT_ID');
</script>
```

## 🎯 **EVENT TRACKING ĐÃ SETUP**

### **Events đã được thêm:**
- `cta_click` - Khi user click vào các CTA buttons
- `pricing_click` - Khi user click vào pricing plans

### **Event Parameters:**
```javascript
// CTA Click Events
{
  button_name: 'experience_natural_voice',
  location: 'hero_section'
}

// Pricing Click Events
{
  plan: 'basic',
  button_name: 'get_started',
  price: 29
}
```

## 📈 **CONVERSION TRACKING**

### **1. Setup Conversion Goals**
Trong GA4 Admin → Conversions:
- **Goal 1**: CTA Clicks (Event: cta_click)
- **Goal 2**: Pricing Page Views (Event: page_view + page_path: "/pricing")
- **Goal 3**: Plan Selections (Event: pricing_click)

### **2. E-commerce Tracking**
```javascript
// Thêm vào payment success
trackEvent('purchase', {
  transaction_id: 'txn_12345',
  value: 29.00,
  currency: 'USD',
  items: [{
    item_id: 'basic_plan',
    item_name: 'Basic Plan',
    category: 'subscription',
    price: 29.00,
    quantity: 1
  }]
});
```

## 🔍 **UTM PARAMETERS**

### **Marketing Campaign Tracking**
```
https://cyan-ai.com?utm_source=google&utm_medium=cpc&utm_campaign=launch
```

### **Custom Campaigns:**
- `utm_source`: google, facebook, linkedin, email
- `utm_medium`: cpc, organic, social, referral
- `utm_campaign`: launch, summer2024, blackfriday
- `utm_content`: ad_copy_1, hero_button

## 📱 **ENHANCED ECOMMERCE**

### **Product Data Structure**
```javascript
// Thêm vào gtag config
gtag('config', 'G-YOUR_MEASUREMENT_ID', {
  currency: 'USD',
  send_page_view: true
});

// Product impressions
trackEvent('view_item_list', {
  items: [
    {
      item_id: 'basic_plan',
      item_name: 'Basic Plan',
      category: 'subscription',
      price: 29.00,
      list_name: 'pricing_plans'
    }
  ]
});
```

## 🎯 **CUSTOM DASHBOARDS**

### **Key Metrics to Track:**
1. **Conversion Rate** = (Purchases / Sessions) × 100
2. **Cost Per Acquisition** = Total Cost / Number of Conversions
3. **Average Order Value** = Total Revenue / Number of Orders
4. **User Engagement** = Page Views + Events + Session Duration

### **Dashboard Setup:**
1. **Acquisition Report**: Traffic sources and campaigns
2. **Behavior Report**: Page performance and user flow
3. **Conversion Report**: Goal completions and revenue
4. **Audience Report**: User demographics and behavior

## 🔧 **ADDITIONAL TOOLS**

### **1. Google Tag Manager (GTM)**
- Container ID: GTM-XXXXXXX
- Tags: GA4, Facebook Pixel, LinkedIn Insight Tag
- Triggers: Page View, Click Events, Form Submissions

### **2. Facebook Pixel**
```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
```

### **3. LinkedIn Insight Tag**
```html
<script type="text/javascript">
_linkedin_partner_id = "YOUR_PARTNER_ID";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(){var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})();
</script>
<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=YOUR_PARTNER_ID&fmt=gif" />
</noscript>
```

## 📊 **REPORTING AUTOMATION**

### **Google Data Studio Dashboard**
- Connect GA4 data source
- Create custom reports
- Share with stakeholders

### **Monthly Reports:**
1. **Traffic Overview**: Sessions, Users, Page Views
2. **Conversion Summary**: Goal completions, Revenue
3. **Top Pages**: Most visited pages
4. **Traffic Sources**: Where users come from

## 🚀 **IMPLEMENTATION CHECKLIST**

- [ ] Create GA4 property and get Measurement ID
- [ ] Update index.html with correct GA4 ID
- [ ] Test event tracking in GA4 DebugView
- [ ] Set up conversion goals
- [ ] Create UTM parameter strategy
- [ ] Set up Facebook Pixel (if needed)
- [ ] Configure Google Tag Manager
- [ ] Create custom dashboards
- [ ] Set up automated reports
- [ ] Test all tracking events

## 📱 **TESTING TRACKING**

### **Google Analytics DebugView**
1. Install Google Analytics Debugger extension
2. Enable DebugView in GA4
3. Test all button clicks and events
4. Verify data appears in real-time

### **Tag Assistant**
1. Use Google Tag Assistant
2. Validate all tracking codes
3. Check for conflicts or errors

## 🔒 **PRIVACY & COMPLIANCE**

### **GDPR Compliance**
```javascript
// Cookie consent implementation
if (consentGiven) {
  // Load analytics scripts
  gtag('consent', 'default', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted'
  });
} else {
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
  });
}
```

### **Cookie Policy**
- Add cookie banner
- Implement consent management
- Update Privacy Policy

## 📈 **SUCCESS METRICS**

### **First 30 Days Goals:**
- **1000+ sessions** from organic traffic
- **2% conversion rate** on pricing page
- **50+ trial signups**
- **10+ paid customers**

### **First 90 Days Goals:**
- **5000+ sessions** monthly
- **3% conversion rate**
- **200+ trial signups**
- **50+ paid customers**
- **$5000+ MRR** (Monthly Recurring Revenue)

## 🎯 **OPTIMIZATION TIPS**

### **A/B Testing Ideas:**
1. **Hero CTA button color** (cyan vs orange)
2. **Pricing page layout** (3 columns vs 2 columns)
3. **Headline variations** (test different value propositions)
4. **Form fields** (reduce friction in signup)

### **Performance Monitoring:**
- Track Core Web Vitals
- Monitor page load speed
- Check mobile vs desktop performance
- Analyze user flow and drop-off points

---

**🎉 Website của bạn đã sẵn sàng với analytics tracking hoàn chỉnh!**
