#!/usr/bin/env tsx
/**
 * Image Optimization Script
 * Converts JPG/PNG to WebP/AVIF, caps width at 1920px, quality 70%
 * Skips existing optimized images, keeps originals in .original-images
 */

import sharp from "sharp"
import fs from "fs/promises"
import path from "path"
import { glob } from "glob"

const PUBLIC_DIR = "./public"
const ORIGINAL_DIR = path.join(PUBLIC_DIR, ".original-images")
const MAX_WIDTH = 1920
const QUALITY = 70

async function ensureDirectoryExists(dir: string) {
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

async function getImageFiles() {
  const patterns = [`${PUBLIC_DIR}/**/*.jpg`, `${PUBLIC_DIR}/**/*.jpeg`, `${PUBLIC_DIR}/**/*.png`]

  const files: string[] = []
  for (const pattern of patterns) {
    files.push(...(await glob(pattern, { ignore: `${ORIGINAL_DIR}/**` })))
  }

  return files
}

async function optimizeImage(inputPath: string) {
  const relativePath = path.relative(PUBLIC_DIR, inputPath)
  const parsedPath = path.parse(inputPath)
  const baseName = path.join(parsedPath.dir, parsedPath.name)

  const webpPath = `${baseName}.webp`
  const avifPath = `${baseName}.avif`
  const originalBackupPath = path.join(ORIGINAL_DIR, relativePath)

  // Skip if optimized versions already exist
  const webpExists = await fs
    .access(webpPath)
    .then(() => true)
    .catch(() => false)
  const avifExists = await fs
    .access(avifPath)
    .then(() => true)
    .catch(() => false)

  if (webpExists && avifExists) {
    console.log(`⚡ Skipping ${relativePath} (optimized versions exist)`)
    return
  }

  try {
    // Ensure original backup directory exists
    await ensureDirectoryExists(path.dirname(originalBackupPath))

    // Backup original if not already backed up
    const originalExists = await fs
      .access(originalBackupPath)
      .then(() => true)
      .catch(() => false)
    if (!originalExists) {
      await fs.copyFile(inputPath, originalBackupPath)
      console.log(`📦 Backed up ${relativePath}`)
    }

    // Get image metadata
    const metadata = await sharp(inputPath).metadata()
    const shouldResize = metadata.width && metadata.width > MAX_WIDTH

    // Create sharp instance with potential resize
    let sharpInstance = sharp(inputPath)
    if (shouldResize) {
      sharpInstance = sharpInstance.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: "inside",
      })
    }

    // Generate WebP if not exists
    if (!webpExists) {
      await sharpInstance.clone().webp({ quality: QUALITY, effort: 4 }).toFile(webpPath)

      const originalSize = (await fs.stat(inputPath)).size
      const webpSize = (await fs.stat(webpPath)).size
      const savings = (((originalSize - webpSize) / originalSize) * 100).toFixed(1)

      console.log(`✅ WebP: ${relativePath} (${savings}% smaller)`)
    }

    // Generate AVIF if not exists
    if (!avifExists) {
      await sharpInstance.clone().avif({ quality: QUALITY, effort: 4 }).toFile(avifPath)

      const originalSize = (await fs.stat(inputPath)).size
      const avifSize = (await fs.stat(avifPath)).size
      const savings = (((originalSize - avifSize) / originalSize) * 100).toFixed(1)

      console.log(`✅ AVIF: ${relativePath} (${savings}% smaller)`)
    }
  } catch (error) {
    console.error(`❌ Failed to optimize ${relativePath}:`, error)
  }
}

async function main() {
  console.log("🖼️  Starting image optimization...\n")

  await ensureDirectoryExists(ORIGINAL_DIR)

  const imageFiles = await getImageFiles()
  console.log(`Found ${imageFiles.length} images to process\n`)

  if (imageFiles.length === 0) {
    console.log("No images found to optimize.")
    return
  }

  for (const file of imageFiles) {
    await optimizeImage(file)
  }

  console.log("\n🎉 Image optimization complete!")
  console.log(`📁 Original images backed up to: ${ORIGINAL_DIR}`)
  console.log("💡 Next.js will automatically serve WebP/AVIF when supported")
}

if (require.main === module) {
  main().catch(console.error)
}
