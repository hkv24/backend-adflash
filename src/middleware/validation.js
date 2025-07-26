import { HTTP_STATUS, ERROR_MESSAGES } from '../utils/constants.js'

export const validateGenerateRequest = (req, res, next) => {
  const { prompt } = req.body
  
  if (!prompt || prompt.trim() === '') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: ERROR_MESSAGES.PROMPT_REQUIRED
    })
  }

  // Validate uploaded files
  if (!req.files || req.files.length === 0) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: 'At least one image file is required'
    })
  }

  next()
}

export default validateGenerateRequest
