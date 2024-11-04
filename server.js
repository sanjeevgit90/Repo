var express = require('express');
var path = require('path');

var app = express();

app.get('/', (req, res) => {
   res.sendFile(path.resolve('dist/index.html'))
});

app.listen(4200, () => {
  console.log('Server started!')
})