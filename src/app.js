import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import routes from './routes/index.js'
import errorHandler from './middleware/errorHandler.js'
import { ensureDirectoryExists } from './utils/fileUtils.js'

console.log('🔧 Initializing application...')

// Ensure required directories exist
console.log('📁 Setting up directories...')
ensureDirectoryExists(config.uploadsDir)
ensureDirectoryExists(config.outputDir)

const app = express()

console.log('⚙️ Setting up middleware...')
// Middleware
app.use(express.json())
app.use(cors())

console.log('🛣️ Setting up routes...')
// Routes
app.use('/', routes)

// Error handling middleware (must be last)
app.use(errorHandler)

console.log('✅ Application initialized successfully')

export default app
