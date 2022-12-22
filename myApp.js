const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.get("/now", (req, res, next) => {
  req.time = new Date().toString()
  next()
}, (req, res) => {
  res.json({ "time": req.time });
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/public/style.css', (req, res) => {
  res.sendFile(__dirname + '/public/style.css')
})

app.get('/json', (req, res) => {
  let message = "Hello json"
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ "message": message.toUpperCase() })
  } else {
    res.json({ "message": message })
  }
})

app.get('/:word/echo', (req, res) => {
  const word = req.params.word
  console.log(word)
  res.json({ echo: word })
})

app

app.route('/name')
  .post((req, res) => {
    const name = req.body.first
    const last = req.body.last
    console.log(req.body.first)
    res.json({ name: `${name} ${last}` })
  })



module.exports = app;
