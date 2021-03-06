import Express from "express";
import run from "./lib/run.js";
import engine from "./lib/engine3.js";
import pythonrun from "./lib/yolo2.js";
import boot from "./lib/boot.js";
import bodyParser from "body-parser";

const app = Express();
const port = 3000;

//app.use(bodyParser.json())

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.get("/", (req, res) => {
  var start = new Date();
  var payload = boot(req.query);

  if (payload) {
    var data = engine(req.query.lang, payload, req.query.name, res, start);
    // if (data != 1) {
    //   var end = new Date();
    //   var time = end - start;
    //   //data.time = time;s
    //   res.send(data);
    // }
  } else {
    res.send("You are not authorized to used this application");
  }
});

app.post("/hello", (req, res) => {
  res.send("hello post");
});
app.get("/hello", (req, res) => {
  res.send("hello get");
});

app.all("/python", (req, res) => {
  console.log(JSON.stringify(req.body));
  var name = req.body.name;
  var image = req.body.image;

  if (!name) name = "1";
  console.log(name);

  if (name) {
    var data = pythonrun(image, name, res);
    //console.log(data)
  } else {
    var str = JSON.stringify(req.body);
    res.send("You are not authorized to used this application :" + str);
  }
});

app.post("/", (req, res) => {
  var start = new Date();
  var payload = boot(req.body);
  if (payload) {
    var data = engine(req.body.lang, payload, req.body.name, res, start);
    // var end = new Date();
    // var time = end - start;
    // data.time = time;
    // res.send(data);
  } else {
    var str = JSON.stringify(req.body);
    res.send("You are not authorized to used this application " + str);
  }
});

app.get("/code", (req, res) => {
  var start = new Date();
  var str = run();
  var end = new Date();
  var time = end - start;
  str.time = time;
  console.info("Execution time: %dms", time);
  console.log(str.stdout);
  console.log(req.query.sample);
  res.send(str);
});

app.get("/hello", (req, res) => {
  //res.send("hello world");
  const str = shelljs.exec('echo "hello"');
  res.send(str);
});

console.log("hello world KT");

app.listen(port, () => {
  console.log("Listening on port " + port);
});
