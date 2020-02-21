const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/notes', (request, response) => {
  //must provide absolute path to sendFile even if you have static
  response.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

//returns all the notes in db.json
app.get('/api/notes', (request, response) => {
  fs.readFile(path.join(__dirname, 'db', 'db.json'),'utf8', (error, data) => {
    if(error){
      console.error(error)
    }
    let notes = JSON.parse(data)
    response.json(notes)
  })
})

//to POST to db.json
app.post('/api/notes', (request, response)=>{
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (error, data)=>{
    if(error){
      console.error(error)
    }
    let notes = JSON.parse(data)
    notes.push(request.body)
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), error=>{
      if(error){
        console.error(error)
      }
      response.sendStatus(200)
    })
  })
})

app.delete('/api/notes/:id', (request, response)=>{
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (error, data)=>{
    if(error){
      console.error(error)
    }
    let notes = JSON.parse(data)
    //maps the note array and for each element, returns the title of the note
    //then checks if it matches request.params.id
    let index = notes.map(note =>{return note.title}).indexOf(request.params.id)
    //indexOf returns -1 if the element you are looking for is not in array
    if(index === -1){
      console.error(new Error('Note does not exist!'))
    }
    //removing the instance from array
    notes.splice(index, 1)
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), error=>{
      if(error){
        console.error(error)
      }
      response.sendStatus(200)
    })
  })
})
//passes in the port given by heroku or 3000
app.listen(process.env.PORT || 3000)