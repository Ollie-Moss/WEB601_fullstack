import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//protect capability
const protect = asyncHandler(async (req, res, next) => { 
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token from the "Authorization" header
      token = req.headers.authorization.split(' ')[1]
      // Verify the token and decode the payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Attach the user object to the request, minus the password
      req.user = await User.findById(decoded.id).select('-password')
      
      next() // Call the next middleware in the stack
    } catch (error) {
      // If no token is found, return a 401 Unauthorized error
      console.error(error)
      res.status(401) 
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) { // if theres no token
    res.status(401)
    throw new Error('Not authorized, no token') 
  }
})
// admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) { 
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
