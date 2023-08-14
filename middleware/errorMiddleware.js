const errorMiddleWare = (err, req, res, next) => {
  console.log('Here is an error middleware')
  const statusCode = res.statusCode ? res.statusCode : 500
  res.statusCode(statusCode)
  res.json({message: error.message, stack: process.env.NODE_ENV === "development" ? err.stack : null})

}
module.exports = errorMiddleWare
