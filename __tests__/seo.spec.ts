import { metadata } from "@/app/layout"

describe("App metadata", () => {
  it("defines base title and description", () => {
    expect(metadata.title?.default).toBeTruthy()
    expect(metadata.description).toBeTruthy()
  })
})
