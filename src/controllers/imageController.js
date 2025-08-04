import imageGenerationService from '../services/imageGenerationService.js'
import { cleanupFiles } from '../utils/fileUtils.js'
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../utils/constants.js'

export const generateImages = async (req, res, next) => {
  try {
    const { prompt, n, model, size, cta, adTheme, language, aspectRatio } = req.body
    const uploadedFiles = req.files

    const options = {
      n: n ? parseInt(n) : 1,
      model
    }

    // Generate images using image generation service
    const results = await imageGenerationService.generateImages(
      uploadedFiles, 
      prompt, 
      cta, 
      adTheme, 
      language, 
      aspectRatio, 
      options
    )

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
