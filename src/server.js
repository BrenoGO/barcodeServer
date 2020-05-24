const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.post('/sendData', (req, res) => {
  console.log('in sendData');
  try{
    const { estoque } = req.body;

    const timestamp = Date.now();
    const fileName = `${timestamp}.txt`;
    const finalFileName = 'estoque.txt';

    fs.writeFileSync(path.resolve(__dirname, 'files', fileName), estoque);
    fs.appendFileSync(path.resolve(__dirname, 'files', finalFileName), estoque);
    return res.status(200).json({success: 'Data was saved!'})
  }catch(err) {
    return res.status(400).json({err});
  }
})

app.listen('8087', () => {
  console.log('listening to port 8087');
})