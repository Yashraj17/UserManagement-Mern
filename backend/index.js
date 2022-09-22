const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const connectDb = require('./DataBase/dbConfig');
const Route = require('./Route/api');
const app = express();
connectDb('mongodb://localhost:27017/UserManagement')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

app.use('/api',Route)

const server =  app.listen(8081)