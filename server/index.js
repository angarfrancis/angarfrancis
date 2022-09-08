const express = require('express');
const errorHandler = require("./middlewares/errors");
require("dotenv").config({ path: ".env" });
const db = require("./config/db");

db.connect();

const app = express();

// midlewares
app.use(express.static('public'))
app.use(express.json());
// enable cross access origin
app.all('*', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, HEAD", "OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// Hooks 
require('./hooks/user')();

// routes
app.use('/api/auth', require("./routes/auth"));
app.use('/api/department', require("./routes/department"));
app.use('/api/time_table', require("./routes/time_table"));
app.use('/api/college', require("./routes/college"));
app.use('/api/rooms', require("./routes/rooms"));
app.use('/api/subs', require("./routes/subject"));
app.use('/api/user', require("./routes/user"));

app.use('**', (req,res)=>{
    res.redirect(req.path)
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
});