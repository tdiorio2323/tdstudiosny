# Client Assets Structure

This directory contains all client logos, gallery images, and other assets for the portfolio page.

## Folder Structure

Each client has their own folder with the following structure:

```
/clients/
  ├── client-name/
  │   ├── logo.png          # Client logo (required)
  │   ├── gallery-1.jpg     # Gallery image 1 (optional)
  │   ├── gallery-2.jpg     # Gallery image 2 (optional)
  │   ├── gallery-3.jpg     # Gallery image 3 (optional)
  │   └── ...               # Additional gallery images
```

## Current Client Folders

1. `quick-printz/` - Quick Printz
2. `apsco-sports/` - Apsco Sports Enterprises
3. `body-boutique/` - The Body Boutique
4. `chef-izzy/` - Chef Izzy
5. `mama-rosaria/` - Mama Rosaria
6. `cabana/` - Cabana
7. `legacy-capital/` - Legacy Capital Group
8. `sneaker-zoo/` - Sneaker Zoo
9. `calco-roofing/` - Calco Roofing & Seamless Gutters
10. `punkiez/` - Punkiez
11. `serious-inquiries-only/` - Serious Inquiries Only
12. `truth/` - Truth
13. `leonardos-auto/` - Leonardo's Auto Body
14. `custom-creations-auto/` - Custom Creations Auto Body
15. `fort-maner/` - Fort Maner

## How to Add Client Assets

1. **Add Logo**: Place the client logo as `logo.png` (or .svg, .jpg) in their folder
2. **Add Gallery Images**: Add up to 3 images named `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg`
3. **Update Client Data**: Edit `/lib/clients-data.ts` to add:
   - Services provided
   - Project description
   - Results/outcomes
   - Website URL
   - Social media links
   - Testimonials (optional)

## Image Requirements

- **Logo**: Transparent background recommended, 500x500px minimum
- **Gallery Images**: 1920x1080px recommended, 16:9 aspect ratio
- **File Formats**: PNG (logos), JPG/PNG (gallery)
- **File Size**: Compress images for web (under 500KB each)

## Editing Client Information

All client data is stored in `/lib/clients-data.ts`. To update a client:

1. Find the client object by `id` or `name`
2. Update the fields:
   - `services`: Array of services provided
   - `description`: Project overview text
   - `results`: Array of 3-5 key results/outcomes
   - `websiteUrl`: Client's website
   - `socialLinks`: Instagram, Facebook, Twitter, LinkedIn URLs
   - `testimonial`: Client quote with author info

Example:

```typescript
{
  id: "quick-printz",
  name: "Quick Printz",
  services: ["Branding", "Website Design", "E-commerce"],
  description: "Complete digital transformation for a printing company...",
  results: [
    "300% increase in online orders",
    "Award-winning website design",
    "50% reduction in customer inquiries"
  ],
  websiteUrl: "https://quickprintz.com",
  socialLinks: {
    instagram: "https://instagram.com/quickprintz"
  }
}
```
