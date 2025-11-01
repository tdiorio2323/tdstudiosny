import * as matchers from "@testing-library/jest-dom/matchers"
import * as React from "react"
import { expect, vi } from "vitest"

type GlobalWithReact = typeof globalThis & { React: typeof React }
;(globalThis as GlobalWithReact).React = React

expect.extend(matchers)

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}))

vi.mock("next/font/google", () => ({
  Inter: () => ({ className: "font-inter" }),
}))

// Mock next/link
vi.mock("next/link", () => {
  return {
    default: ({
      children,
      href,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => {
      return React.createElement("a", { href, ...props }, children)
    },
  }
})

// Mock next/image
vi.mock("next/image", () => {
  return {
    default: (props: Record<string, unknown>) => {
      return React.createElement("img", props)
    },
  }
})
