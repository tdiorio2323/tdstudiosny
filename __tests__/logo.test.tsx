import { render, screen } from "@testing-library/react"
import { Logo } from "@/components/Logo"

describe("Logo", () => {
  it("should render the logo image", () => {
    render(<Logo />)
    const logoImage = screen.getByAltText("TD Studios Logo")
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute("src")
  })
})
