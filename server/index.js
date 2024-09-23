const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const router = require('./routes/routes');
const app = express();
const port = 3001||3002;

//middlewares
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(res)=>{res.send('Hello world')})

//routes
app.use('/api',router)

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
  })