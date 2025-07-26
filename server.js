import app from './src/app.js'
import config from './src/config/index.js'

app.listen(config.port, () => {
  console.log(`🚀 Server is running on port: ${config.port}`)
  console.log(`📁 Uploads directory: ${config.uploadsDir}`)
  console.log(`📁 Output directory: ${config.outputDir}`)
  console.log(`🔑 OpenAI API Key configured: ${config.openaiApiKey ? '✅' : '❌'}`)
})
