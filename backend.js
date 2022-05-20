const tf = require("@tensorflow/tfjs-node");
const mobilenet = require("@tensorflow-models/mobilenet");

var express = require("express");
const multer = require("multer");
const upload = multer();
var bodyParser = require("body-parser");
const fs = require("fs");
var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);
app.use(jsonParser);
// respond with "hello hello hellox" when a GET request is made to the homepage

app.post("/hello", upload.single("file"), async function (req, res) {
  // res.send("hello hello hello");
  const model = await mobilenet.load();
  const tfimage = tf.node.decodeImage(req.file.buffer);
  const pred = await model.classify(tfimage);
  console.log(pred);
  res.send(pred);
});


app.use(express.static('build'));


app.listen(process.env.PORT || 8080);

console.log('BACKEND IS RUNNING AT:', 'http://localhost:8080/');
