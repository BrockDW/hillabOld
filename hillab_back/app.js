const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require('./db');
var cors = require('cors')

app.get('/testingProgram', (req, res) => {
    res.status(200).json({
        message: "I am working here in DnD app"
    })
});


app.use(morgan("dev"));
app.use(cors()) // Use this after the variable declaration
app.use('/postUploads', express.static('postUploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
//app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Disposition"
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    if (req.method == "OPTIONS") {
        res.header('Access-Control-Arrow-Methods', 'PUT, POST, PATCH, DELET');
        return res.status(200).json({});
    }
    next()
});

const userRoutes = require('./api/routes/users');
app.use("/users", userRoutes);

// const profileRoutes = require('./api/routes/profile');
// app.use("/profile", profileRoutes);

app.use('/assets', express.static('./assets'));

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});



app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message: error.message,
        error: {
            message: error.message,
            messagetwo: "page not find maybe"
        }
    });
});

module.exports = { app, db };


