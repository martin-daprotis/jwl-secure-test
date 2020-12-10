const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

var jwt = require('jsonwebtoken');

const app = express();
const PORT = 4000;

app.use(cors({credentials:true,origin:'http://localhost:3001'}));

app.use(cookieParser());

app.get(`/api/token`, (req, res) => {
  const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  res.status(200).
      cookie('JWT_httponly', token,{sameSite:'strict',httpOnly:true }).
      send(token)
})

app.listen(PORT, err => {
  if (err) throw err
  console.log(`Server ready on http://localhost:${PORT}`)
})