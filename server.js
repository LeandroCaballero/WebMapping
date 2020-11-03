const path = require('path') //une las rutas de windows o linux
var express = require('express');
var app = express();
const port = 3000

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/views/index.html'))
});

app.listen(port, () => {
  console.log(`Run on port: ${port}`)
})