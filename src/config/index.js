import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const config = {
  port: process.env.PORT || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY,
  uploadsDir: path.join(__dirname, '../../uploads'),
  outputDir: path.join(__dirname, '../../output'),
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 10,
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}

export default config
