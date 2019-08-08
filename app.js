const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const API = require("./routes/api");
const db = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
var methodOverride = require('method-override');
const user = require("./routes/auth");
const app = express();
db.then(()=>console.log("server started at port 3000..."));
db.catch((err)=>console.log(err));


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use(cors());

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(passport.initialize());
app.use(passport.session());

// use session/cookie for auth
app.use(cookieParser());
app.use(session({ 
    secret: 'clinksecret',  
    saveUninitialized: true,
    resave: true
}));


app.get("/",(req,res)=>{
    res.send("Ooi mate");
});


app.use("/api",API);
app.use("/user",user);


const PORT = process.env.PORT = 3000;
app.listen(PORT,(err)=>{
    if (err) throw err;
    console.log(`app started at http://localhost:${PORT}`)
});
