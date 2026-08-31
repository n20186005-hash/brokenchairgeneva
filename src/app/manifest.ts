import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Broken Chair Geneva: History, Meaning & Visitor Guide',
    short_name: 'Broken Chair',
    description:
      'Visitor guide to the Broken Chair monument at Place des Nations, Geneva — history, meaning, transport and photo tips.',
    start_url: '/en',
    scope: '/',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#3a7a8d',
    categories: ['travel', 'tourism', 'lifestyle'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
