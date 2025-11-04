/**
 * Analytics utilities for tracking user behavior and conversions
 */

// Track page views
export const trackPageView = (pageName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_title: pageName,
      page_location: window.location.href,
    })
  }
}

// Track button clicks and interactions
export const trackButtonClick = (buttonName: string, location: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "click", {
      event_category: "engagement",
      event_label: `${buttonName} - ${location}`,
      custom_parameter_1: buttonName,
      custom_parameter_2: location,
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formType: string, success: boolean = true) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", success ? "form_submit" : "form_error", {
      event_category: "conversion",
      event_label: formType,
      value: success ? 1 : 0,
    })
  }
}

// Track scroll depth for engagement measurement
export const trackScrollDepth = (depth: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "scroll", {
      event_category: "engagement",
      event_label: `${depth}%`,
      value: depth,
    })
  }
}

// Track time spent on page
export const trackTimeOnPage = (timeInSeconds: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "timing_complete", {
      name: "page_time",
      value: timeInSeconds,
    })
  }
}

// Track CTA performance
export const trackCTAPerformance = (ctaText: string, position: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      event_category: "conversion",
      event_label: `${ctaText} - ${position}`,
      custom_parameter_1: ctaText,
      custom_parameter_2: position,
    })
  }
}

// Declare gtag function for TypeScript
declare global {
  type GtagConfigValue = string | number | boolean | undefined

  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, GtagConfigValue>) => void
  }
}
