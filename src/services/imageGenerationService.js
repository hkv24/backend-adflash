import FormData from 'form-data'
import axios from 'axios'
import fs from 'fs'
import config from '../config/index.js'

class OpenAIService {
  constructor() {
    this.apiKey = config.openaiApiKey
    this.baseURL = 'https://api.openai.com/v1'
  }

  async generateImages(uploadedFiles, prompt, options = {}) {
    const { n = 1, model, size } = options

    if (!this.apiKey) {
      throw new Error('OpenAI API key is not configured')
    }

    const form = new FormData()

    console.log(`Processing ${uploadedFiles.length} images`)

    // Append images to form data
    uploadedFiles.forEach((file, index) => {
      form.append('image[]', fs.createReadStream(file.path))
    })

    // Enhance prompt with professional ad requirements
    const enhancedPrompt = `${prompt} Make sure, it looks professional and a high quality ad and every text (if any) is clearly visible. CTA Buy Now`

    // Append other parameters
    form.append('prompt', enhancedPrompt)
    form.append('n', n)
    if (size) form.append('size', size)
    if (model) form.append('model', model)

    try {
      const response = await axios.post(`${this.baseURL}/images/edits`, form, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          ...form.getHeaders(),
        },
        maxBodyLength: Infinity,
      })

      return this.processImageResponse(response.data.data)
    } catch (error) {
      console.error('OpenAI API Error:', error.response?.data || error.message)
      throw error
    }
  }

  processImageResponse(generatedImagesData) {
    const results = []

    generatedImagesData.forEach((imageData, index) => {
      const b64Image = imageData.b64_json
      
      results.push({
        imageBuffer: b64Image,
        filename: `generated_image_${Date.now()}_${index}.png`,
        mimeType: 'image/png'
      })
    })

    console.log(`Generated ${results.length} images successfully`)
    return results
  }
}

export default new OpenAIService()
