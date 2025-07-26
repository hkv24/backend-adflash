import app from './src/app.js'
import config from './src/config/index.js'

const host = '0.0.0.0' // Railway requires binding to all interfaces

const server = app.listen(config.port, host, () => {
  console.log(`🚀 Server running on ${host}:${config.port}`)
  console.log(`🔑 OpenAI API: ${config.openaiApiKey ? 'Configured' : 'Missing'}`)
})

server.on('error', (error) => {
  console.error('❌ Server failed to start:', error)
  process.exit(1)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down gracefully...')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})
