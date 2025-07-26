import fs from 'fs'
import path from 'path'

export const ensureDirectoryExists = (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
      console.log(`✅ Created directory: ${dirPath}`)
    }
  } catch (error) {
    console.error(`❌ Failed to create directory ${dirPath}:`, error.message)
    // Don't throw error, just log it - Railway might have read-only filesystem restrictions
  }
}

export const cleanupFiles = (files) => {
  if (!files || !Array.isArray(files)) return
  
  files.forEach(file => {
    if (fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path)
        console.log(`Cleaned up file: ${file.path}`)
      } catch (error) {
        console.error(`Error cleaning up file ${file.path}:`, error.message)
      }
    }
  })
}

export const generateUniqueFilename = (originalname) => {
  const ext = path.extname(originalname)
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  return `images-${uniqueSuffix}${ext}`
}
