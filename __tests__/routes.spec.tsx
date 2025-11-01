import { metadata as bookPageMetadata } from "@/app/book/page"

describe("Route metadata", () => {
  it("includes book page metadata", () => {
    expect(bookPageMetadata.title).toBeTruthy()
    expect(bookPageMetadata.description).toBeTruthy()
  })
})
