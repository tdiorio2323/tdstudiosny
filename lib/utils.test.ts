import { cn } from "./utils"

describe("cn", () => {
  it("should merge tailwind classes correctly", () => {
    // Overlapping classes, last one should take precedence
    const result = cn("p-4 bg-red-500", "p-2 bg-blue-500")
    expect(result).toBe("p-2 bg-blue-500")
  })

  it("should handle conditional classes", () => {
    const hasBorder = true
    const result = cn("p-4", hasBorder && "border")
    expect(result).toBe("p-4 border")
  })

  it("should remove conflicting classes", () => {
    const result = cn("px-4 py-2", "p-2")
    expect(result).toBe("p-2")
  })
})
