const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.post('/save', (req, res) => {
  // console.log('in sendData');
  try{
    const { estoque, user, project } = req.body;

    const timestamp = Date.now();
    const fileName = `${user}-${timestamp}.txt`;
    const finalFileName = `${project}.txt`;

    fs.writeFileSync(path.resolve(__dirname, 'files', fileName), estoque);
    fs.appendFileSync(path.resolve(__dirname, 'files', finalFileName), estoque);
    return res.status(200).json({success: 'Data was saved!'})
  }catch(err) {
    console.log('error saving data..');
    console.log(err);
    return res.status(500).json({err: err.message});
  }
})

app.listen('8087', () => {
  console.log('listening to port 8087');
})