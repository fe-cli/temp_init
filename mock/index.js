const path = require('path')
const fs = require('fs')
const basePath = require('../config').basePath
const reg = basePath ? new RegExp('^\\/api\\/') : '*'
function Index (app) {
  app.get(reg, function (req, res, next) {
    let filePath = req.path.slice(1, req.path.length).replace(/\//g, '_')
    let filename = path.resolve(__dirname, `${filePath}.json`)
    if (fs.existsSync(filename)) {
      res.json(JSON.parse(fs.readFileSync(filename)))
    } else {
      console.log(filePath + ' is no file')
      next()
    }
  })
}

module.exports = Index
