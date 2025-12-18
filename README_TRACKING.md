# Google Analytics 4 & Performance Max Tracking Guide

## 1. Google Analytics 4 (GA4) Installed
We have successfully installed the GA4 Global Tag for your property **G-2RBDXLQV7L** on all pages of the website. 
This was done by adding the tag to the global `Layout.astro` file, which ensures every page (including your 3 campaign pages) is tracked automatically.

## 2. Existing "Generate Lead" Events
Your campaign pages (`cerere-oferta-2026`, `configurator-curs`, `notificare-2026`) are already configured to send a **`generate_lead`** event to Google Analytics when a form is submitted.

**Current Event Labels:**
- Cerere Ofertă: `request_2026`
- Configurator: `quiz_2026`
- Notificare: `email_2026`

These events fire *immediately* upon form submission, before the redirect to the Thank You page.

## 3. How to Connect to Performance Max (PMax)

To let your Performance Max campaigns know about these conversions, you should **Import GA4 Conversions into Google Ads**. This is the recommended modern workflow.

### Step-by-Step Guide:

**A. Link Accounts**
1.  Go to **Google Ads** > **Tools & Settings** > **Setup** > **Linked Accounts**.
2.  Find **Google Analytics (GA4) & Firebase**.
3.  Click **Details** -> **Link** for your specific property (G-2RBDXLQV7L).
4.  Enable "Import Google Analytics audiences" if you want remarketing.

**B. Import Conversions**
1.  In **Google Ads**, go to **Goals** > **Conversions** > **Summary**.
2.  Click **+ New conversion action**.
3.  Select **Import** > **Google Analytics 4 properties** > **Web**.
4.  You should see the `generate_lead` event listed (if it has fired recently).
    *   *Note: If you haven't tested the form yet, submit a test form on your site first so GA4 records the event.*
5.  Select `generate_lead` and click **Import and continue**.

**C. Optimize for PMax**
1.  Once imported, click on the conversion name (e.g., `generate_lead`).
2.  Edit settings:
    *   **Goal and action optimization**: Set as **Primary** action.
    *   **Data-driven attribution**: Standard for PMax.
3.  In your **Performance Max Campaign Settings**:
    *   Ensure this conversion goal is included in the campaign goals.

---

## Alternative: Tracking the "Thank You" Page
Since all your forms redirect to `/thank-you`, you can also create a conversion rule based on page view.

1.  In Google Ads > Conversions > New > Website.
2.  Enter your URL (`https://yoursite.com/thank-you`).
3.  Create a "Page Load" conversion for URL contains `/thank-you`.
4.  This is a simpler fallback if the event tracking has issues, but sends less specific data than the event method.

*Recommendation: Use the **Import from GA4** method (Step 3) as it leverages your existing code completely.*
