import express from 'express'
import imageRoutes from './imageRoutes.js'

const router = express.Router()

// Mount all routes
router.use('/', imageRoutes)

export default router
