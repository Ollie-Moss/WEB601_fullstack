/*
File: backend/routes/uploadRoutes.js
Description: Imports controllers, sets up routes and their methods
Versions: 0.1.0
Author: WEB601
*/

import path from 'path' 
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) { // sets up where the uploads are stored
    cb(null, 'uploads/') // cb = callback in multer
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) { // validation for the file type
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({ //middleware setup 
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => { // upload route
  res.send(`/${req.file.path}`)
})

export default router
