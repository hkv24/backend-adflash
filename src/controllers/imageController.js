import openaiService from '../services/imageGenerationService.js'
import { cleanupFiles } from '../utils/fileUtils.js'
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../utils/constants.js'

export const generateImages = async (req, res, next) => {
  try {
    const { prompt, n, model, size } = req.body
    const uploadedFiles = req.files

    const options = {
      n: n ? parseInt(n) : 1,
      model,
      size
    }

    // Generate images using OpenAI service
    const results = await openaiService.generateImages(uploadedFiles, prompt, options)

    // Clean up uploaded files after successful processing
    cleanupFiles(req.files)

    // Send response
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.IMAGES_GENERATED(results.length),
      images: results
    })

  } catch (error) {
    next(error)
  }
}

export const healthCheck = (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: SUCCESS_MESSAGES.HEALTH_OK
  })
}
