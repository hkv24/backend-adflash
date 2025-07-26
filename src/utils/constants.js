export const API_ROUTES = {
  HEALTH: '/health',
  GENERATE: '/api/v1/generate'
}

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500
}

export const ERROR_MESSAGES = {
  PROMPT_REQUIRED: 'Prompt is required',
  INVALID_FILE_TYPE: 'Only image files are allowed!',
  FILE_TOO_LARGE: 'File size exceeds the limit',
  OPENAI_ERROR: 'Error processing images with OpenAI',
  INTERNAL_ERROR: 'Internal server error'
}

export const SUCCESS_MESSAGES = {
  IMAGES_GENERATED: (count) => `Successfully generated ${count} images`,
  HEALTH_OK: 'Server is healthy'
}
