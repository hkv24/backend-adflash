import express from 'express'
import cors from 'cors'
import config from './config/index.js'
import routes from './routes/index.js'
import errorHandler from './middleware/errorHandler.js'
import { ensureDirectoryExists } from './utils/fileUtils.js'

// Ensure required directories exist
ensureDirectoryExists(config.uploadsDir)
ensureDirectoryExists(config.outputDir)

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/', routes)

// Error handling middleware (must be last)
app.use(errorHandler)

export default app
