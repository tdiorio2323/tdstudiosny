import { render } from "@testing-library/react"
import React from "react"
import { describe, it, expect } from "vitest"
import { Nav } from "../features/layout/components/Nav"

// Mock window.location
Object.defineProperty(window, "location", {
  value: {
    host: "localhost:3000",
  },
  writable: true,
})

describe("Nav", () => {
  it("renders stable snapshot", () => {
    const { asFragment } = render(<Nav />)
    expect(asFragment()).toMatchSnapshot()
  })
})
