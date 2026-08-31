'use client';

import { useEffect } from 'react';

const GA4_ID = 'G-HXM22WWPKP';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 is only loaded after the visitor has accepted the "Analytics" cookie
 * (stored by the Cookie Settings page under `cookiePrefs`).
 */
export default function Analytics() {
  useEffect(() => {
    try {
      const prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
      if (!prefs.analytics) return;
    } catch {
      return;
    }

    const w = window;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer!.push(args);
    };
    w.gtag('js', new Date());
    w.gtag('config', GA4_ID, { anonymize_ip: true });

    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);
  }, []);

  return null;
}
