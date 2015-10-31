var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var localDB = {
    users: [{
        "firstname": "vinuthna",
        "lastname": "reddy",
        "role": "employer",
        "username": "vinu",
        "password": "7284"
    }, {
        "firstname": "narender",
        "lastname": "reddy",
        "role": "employer",
        "username": "kittu",
        "password": "reddy"
    }, {
        "firstname": "usha",
        "lastname": "chandra",
        "role": "employer",
        "username": "usha",
        "password": "kiran"
    }]
};
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
    dest: 'uploads/',
    rename: function(fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
    }
}));


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = 3000;

var router = express.Router();
router.post('/api/photo', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});
// router.get('/employee', function(req, res){
//  res.json({name:'Vinuthna'});
// });
router.post('/login', function(req, res) {
    var userName = req.body.username;
    var passWord = req.body.password;
    console.log('LOGIN API INVKOED USERNAME : ' + userName);
    var result = {};
    var users = localDB.users;
    for (var i = 0; i < users.length; i++) {
        if (users[i].username == userName && users[i].password == passWord) {
            result = users[i];
            var transporter = mailConn();
            var text = 'Hi laddu this messase is using node js\n\n' + userName;
            var mailOptions = {
                from: 'vinuthna7284@gmail.com', // sender address
                to: 'ravi228@gmail.com', // list of receivers
                subject: 'Test mail', // Subject line
                text: text //, // plaintext body
                    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
                };
            });
        }
    }
    res.json(result);
})

app.use('/api', router);

app.listen(port, function() {
    console.log('SERVER STARTED ON PORT : ' + port);
});

var mailConn = function() {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vinuthna7284@gmail.com', // Your email id
            pass: '7284Vinnu' // Your password
        }
    });
    return transporter;
};
