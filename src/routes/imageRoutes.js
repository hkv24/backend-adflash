import express from 'express'
import { generateImages, healthCheck } from '../controllers/imageController.js'
import { upload } from '../middleware/upload.js'
import validateGenerateRequest from '../middleware/validation.js'
import config from '../config/index.js'

const router = express.Router()

// Health check endpoint
router.get('/health', healthCheck)

// Image generation endpoint
router.post('/api/v1/generate', 
  upload.array('images', config.maxFiles),
  validateGenerateRequest,
  generateImages
)

export default router
