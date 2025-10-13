import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/next"
import { Footer } from "@/components/footer"
import { StickyHeader } from "@/components/sticky-header"
import { AnalyticsProvider } from "@/components/analytics-provider"
import "./globals.css"
import "@/styles/layout-scale.css"
import type React from "react"
import { Suspense } from "react"

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tdstudiosny.com"),
  title: { default: "TD Studios", template: "%s · TD Studios" },
  description: "High-end websites, branding, and marketing systems engineered for creators and ambitious brands.",
  alternates: { canonical: "/" },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0b0b0c" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/main-background.webp"
        />
      </head>
  <body className={`${inter.className} bg-black text-white antialiased`}>
        {/** Sitewide Organization JSON-LD Schema */}
        <JsonLd data={{
          "@context":"https://schema.org",
          "@type":"Organization",
          "name":"TD Studios",
          "url":"https://tdstudiosny.com",
          "logo":"https://tdstudiosny.com/og/td-logo.png",
          "sameAs":[
            "https://instagram.com/tdstudiosco"
          ]
        }} />
        {/* Skip Navigation Link for Accessibility */}
        <a 
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-md z-[60] font-medium min-h-[44px]"
        >
          Skip to content
        </a>
        <Script src='https://cdn.platform.openai.com/deployments/chatkit/chatkit.js' strategy='afterInteractive' />
        <AnalyticsProvider>
          <StickyHeader />
          <main id="main" role="main">
            <Suspense fallback={<div className="text-white p-8">Loading...</div>}>{children}</Suspense>
          </main>
          <Footer />
        </AnalyticsProvider>
        <Analytics />

        {/* Mobile Viewport Height Fix Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Simple mobile viewport height fix
              function setVH() {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', vh + 'px');
              }

              // Set initial values
              setVH();

              // Re-calculate on resize and orientation change
              window.addEventListener('resize', setVH);
              window.addEventListener('orientationchange', () => {
                setTimeout(setVH, 100);
              });

              // Stagger animation delays for mobile content
              document.addEventListener('DOMContentLoaded', () => {
                const mobileContentElements = document.querySelectorAll('.mobile-content-spacing');
                mobileContentElements.forEach((el, index) => {
                  el.style.setProperty('--stagger-delay', index);
                });
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
