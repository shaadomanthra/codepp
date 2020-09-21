import Express from "express";
import run from "./lib/run.js";
import engine from "./lib/engine.js";
import pythonrun from "./lib/yolo.js";
import boot from "./lib/boot.js";
import bodyParser from "body-parser";
import cluster from "cluster";
import os from "os";

//const app = Express();
const PORT = process.env.PORT || 3000;

const clusterWorkerSize = os.cpus().length;

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on("exit", function (worker) {
      console.log("Worker", worker.id, " has exitted.");
    });
  } else {
    const app = Express();

    app.listen(PORT, function () {
      console.log(
        `Express server listening on port ${PORT} and worker ${process.pid}`
      );
    });
  }
} else {
  const app = express();

  app.listen(PORT, function () {
    console.log(
      `Express server listening on port ${PORT} with the single worker ${process.pid}`
    );
  });

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
      var data = engine(req.query.lang, payload, req.query.name);
      var end = new Date();
      var time = end - start;
      data.time = time;
      res.send(data);
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
    var start = new Date();
    console.log(JSON.stringify(req.body));
    var name = req.body.name;
    var image = req.body.image;

    console.log(name);
    if (!name) name = "1";

    if (name) {
      var data = pythonrun(image, name);
      //console.log(data)
      var end = new Date();
      var time = end - start;
      data["time"] = time.toString();
      var response = {};
      response["image"] = data["image"];
      response["count"] = data["count"];
      response["time"] = data["time"];

      console.log(JSON.stringify(response));
      res.send(response);
    } else {
      var str = JSON.stringify(req.body);
      res.send("You are not authorized to used this application :" + str);
    }
  });

  app.post("/", (req, res) => {
    var start = new Date();
    console.log(req.body);
    var payload = boot(req.body);
    console.log(payload);
    if (payload) {
      var data = engine(req.body.lang, payload, req.body.name);
      var end = new Date();
      var time = end - start;
      data.time = time;
      res.send(data);
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
}

// app.listen(port, () => {
//   console.log("Listening on port " + port);
// });

//app.use(bodyParser.json())
