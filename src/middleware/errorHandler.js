import multer from 'multer'
import { HTTP_STATUS, ERROR_MESSAGES } from '../utils/constants.js'
import { cleanupFiles } from '../utils/fileUtils.js'

export const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err.message)
  
  // Clean up uploaded files in case of error
  if (req.files) {
    cleanupFiles(req.files)
  }

  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: ERROR_MESSAGES.FILE_TOO_LARGE
      })
    }
  }

  // Custom validation errors
  if (err.message === ERROR_MESSAGES.INVALID_FILE_TYPE) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: err.message
    })
  }

  // OpenAI API errors
  if (err.response?.data) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: ERROR_MESSAGES.OPENAI_ERROR,
      details: err.response.data
    })
  }

  // Default error
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: ERROR_MESSAGES.INTERNAL_ERROR,
    message: err.message
  })
}

export default errorHandler
