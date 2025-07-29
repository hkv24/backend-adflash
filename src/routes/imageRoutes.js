import express from 'express'
import { generateImages, healthCheck } from '../controllers/imageController.js'
import { upload } from '../middleware/upload.js'
import validateGenerateRequest from '../middleware/validation.js'
import config from '../config/index.js'
import { generateTitleAndDescription } from '../controllers/titleDescriptionController.js'

const router = express.Router()

// Health check endpoint
router.get('/health', healthCheck)

// Title and description generation endpoint
router.post('/api/v1/title-description', generateTitleAndDescription)


// Image generation endpoint
router.post('/api/v1/generate', 
  upload.array('images', config.maxFiles),
  validateGenerateRequest,
  generateImages
)

export default router
