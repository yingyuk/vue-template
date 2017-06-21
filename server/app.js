const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;
const indexPath = path.join(__dirname, '../dist/index.html');

app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  const index = fs.readFileSync(indexPath, 'utf8');
  res.send(index);
});

app.listen(port, (err) => {
  if (err) {
    console.info(err);
  }
  console.info(`app start at http://localhost:${port}/`);
});
