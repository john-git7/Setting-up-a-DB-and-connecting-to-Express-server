const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose")
require("dotenv").config()
const User = require('./schema')

const app = express();
const port = 3010;
app.use(express.json())
const connectionString =process.env.MONGO_URI

mongoose.connect(connectionString)
 .then(()=> console.log('Connected to database'))
 .catch(()=> console.log('Error connecting to database: ',err))

app.use(express.static('static'));

app.post('/api/users',async (req,res)=>{
    const {name,email,password} = req.body
    const user = new User({name:name,email:email,password:password})
    await user.save()
    .then(
      res.status(201).send({"Message":"Success"})
    )
    .catch((err)=>
    res.status(400).send({"Message":`Validation error ${err.msg}`})
    )
})

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
