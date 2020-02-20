const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/notes', (request, response) => {
  fs.readFile(path.join(__dirname, 'db,json'), 'utf8', (error, data) => {

  })
})


//passes in the port given by heroku or 3000
app.listen(process.env.PORT || 3000)