import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import FormData from 'form-data'
import axios from 'axios'
import cors from 'cors'
import multer from 'multer'

dotenv.config()
const port = process.env.PORT || 3000 || 3002

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors())

const outputDir = path.join(__dirname, 'output')
const uploadsDir = path.join(__dirname, 'uploads')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
})

app.post('/api/v1/generate', upload.array('images', 10), async (req, res) => {
  try {
    const prompt = req.body.prompt
    const uploadedFiles = req.files
    const n = req.body.n ? parseInt(req.body.n) : 1
    const model = req.body.model
    const size = req.body.size


    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    const form = new FormData()

    console.log(`Attempting to process ${uploadedFiles.length} images in a single request with prompt: "${prompt}"`)

    uploadedFiles.forEach((file, index) => {
      console.log(`Appending image ${index + 1}/${uploadedFiles.length}: ${file.originalname}`)
      form.append('image[]', fs.createReadStream(file.path))
    })

    const newPrompt = prompt + ' Make sure, it looks professional and a high quality ad and every text (if any) is clearly visible. CTA Buy Now'

    form.append('prompt', newPrompt)
    form.append('n', n)
    form.append('size', size)
    form.append('model', model)

    console.log('Sending single multipart/form-data request to OpenAI...')

    const response = await axios.post('https://api.openai.com/v1/images/edits', form, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        ...form.getHeaders(),
      },
      maxBodyLength: Infinity,
    })

    const generatedImagesData = response.data.data
    const results = []

    generatedImagesData.forEach((imageData, index) => {
      const b64Image = imageData.b64_json
      const imageBinary = Buffer.from(b64Image, 'base64')

      // Instead of saving to file, just prepare the data for frontend
      console.log(`Generated image ${index + 1} processed`)
      results.push({
        imageBuffer: b64Image, // Send base64 string directly
        filename: `generated_image_${Date.now()}_${index}.png`,
        mimeType: 'image/png'
      })
    })

    // Clean up uploaded files after processing
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      })
    }

    // Send the image data as JSON
    res.json({
      success: true,
      message: `Successfully generated ${results.length} images`,
      images: results
    })

  } catch (err) {
    console.error('Error from OpenAI:', err.response?.data || err.message)
    
    // Clean up uploaded files in case of error
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path)
        }
      })
    }
    
    res.status(500).json({ error: err.response?.data || err.message })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Remove the static file serving since we're not saving files
// app.use('/output', express.static(outputDir))

app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})
