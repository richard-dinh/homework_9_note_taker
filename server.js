const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//returns all the notes in db.json
// app.get('/notes', (request, response) => {
//   fs.readFile(path.join(__dirname, 'db', 'db.json'),'utf8', (error, data) => {
//     if(error){
//       console.error(error)
//     }
//     let notes = JSON.parse(data)
//     console.log(notes)
//     response.json(notes)
//   })
// })

app.get('/notes', (request, response) => {
  //must provide absolute path to sendFile even if you have static
  response.sendFile(path.join(__dirname, 'public', 'notes.html'))
})


//passes in the port given by heroku or 3000
app.listen(process.env.PORT || 3000)