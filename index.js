const connectToMongo = require('./db');
const express = require('express');
const app = express();
var cors = require('cors');
const port =process.env.PORT || 8080;
connectToMongo();
app.use(express.json())//middleware
app.use(cors());

//We will use Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
})