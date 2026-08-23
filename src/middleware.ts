import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Production-grade security headers.
 * Tuned for a Next.js App Router project with Sanity CMS and multimedia support.
 */
const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()',
  'X-DNS-Prefetch-Control': 'on',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "img-src 'self' data: blob: https: cdn.sanity.io",
    "font-src 'self' data: https:",
    "connect-src 'self' https: wss: *.sanity.io *.sanity.work",
    "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join('; '),
};

export function middleware(request: NextRequest) {
  const res = NextResponse.next();

  // Forwarded IP / proto hints (useful behind Vercel/CF/proxies)
  const proto = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');
  if (proto === 'http' && process.env.NODE_ENV === 'production') {
    const httpsUrl = request.nextUrl.clone();
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, 301);
  }

  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    res.headers.set(k, v);
  }

  // Remove Next.js fingerprint
  res.headers.delete('x-powered-by');

  return res;
}

export const config = {
  // Run on everything except static assets and Next internals.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
