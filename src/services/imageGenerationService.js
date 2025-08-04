import FormData from 'form-data'
import axios from 'axios'
import fs from 'fs'
import config from '../config/index.js'

class ImageGenerationService {
  constructor() {
    this.apiKey = config.openaiApiKey
    this.baseURL = 'https://api.openai.com/v1'
  }

  async generateImages(uploadedFiles, prompt, cta = '', adTheme = '', language = '', aspectRatio = '1:1', options = {}) {
    const { n = 1, model } = options
    let size
    if (aspectRatio && aspectRatio.includes('1:1'))
      size = '1024x1024'
    else if (aspectRatio && aspectRatio.includes('16:9'))
      size = '1536x1024'
    else if (aspectRatio && aspectRatio.includes('9:16'))
      size = '1024x1536'
    else
      size = '1024x1024'
    

    if (!this.apiKey) {
      throw new Error('OpenAI API key is not configured')
    }

    const form = new FormData()

    // Append images to form data
    uploadedFiles.forEach((file, index) => {
      form.append('image[]', fs.createReadStream(file.path))
    })

    // Enhance prompt with professional ad requirements
    let enhancedPrompt = prompt
    
    if (adTheme) {
      enhancedPrompt += ` The Advertisement Theme is ${adTheme}.`
    }
    
    if (language) {
      enhancedPrompt += ` It should be in ${language} language.`
    }
    
    enhancedPrompt += ' Make sure it looks professional and a high quality ad and every text (if any) is clearly visible.'
    
    if (cta) {
      enhancedPrompt += ` CTA: ${cta}`
    }

    // Append other parameters
    form.append('prompt', enhancedPrompt)
    form.append('n', n)
    form.append('size', size)
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

    return results
  }
}

export default new ImageGenerationService()
