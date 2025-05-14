const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) // if an item isnt found
  res.status(404) 
  next(error)
}

const errorHandler = (err, req, res, next) => { // error handling
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode // if the error code isn't 200 0r 500, find it again
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // and add it to the error stack
  })
}

export { notFound, errorHandler } // export these to where they're needed
