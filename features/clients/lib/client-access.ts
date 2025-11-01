export interface ClientAccessProfile {
  slug: string
  displayName: string
  brandNames: string[]
  passcode: string
  logoPath: string
  backgroundPath: string
}

export const clientAccessProfiles: Record<string, ClientAccessProfile> = {
  thebodyboutique: {
    slug: "thebodyboutique",
    displayName: "The Body Boutique",
    brandNames: ["the body boutique", "body boutique", "thebodyboutique"],
    passcode: "1111",
    logoPath: "/clients/body-boutique/logo.png",
    backgroundPath: "/backgrounds/body-boutique-satin.jpg",
  },
}
