import multer from 'multer'
import config from '../config/index.js'
import { generateUniqueFilename } from '../utils/fileUtils.js'
import { ERROR_MESSAGES } from '../utils/constants.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadsDir)
  },
  filename: function (req, file, cb) {
    const filename = generateUniqueFilename(file.originalname)
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error(ERROR_MESSAGES.INVALID_FILE_TYPE), false)
  }
}

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: config.maxFileSize
  }
})

export default upload
