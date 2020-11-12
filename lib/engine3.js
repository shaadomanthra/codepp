import shelljs from "shelljs";
import fs from "fs";
import json from "express";
import cp from "child_process";

export default function engine(
  $lang,
  $payload,
  $name = null,
  res = null,
  start = null
) {
  if (!$name) var $name = Math.floor(Math.random() * 1000 + 1);

  if ($lang == "csharp") $lang = "mono";

  var $filename = "json/" + $name + ".json";
  write($filename, $payload, $name, $lang, res, start);
}

function stop($name) {
  fs.unlink("json/" + $name + ".json");

  const exec = cp.exec;
  var process = exec("docker container stop -t 10 " + $name);
  process.stdout.on("data", (output) => {});

  var process2 = exec("docker rm $(docker ps -a -q)");
  process2.stdout.on("data", (output) => {});
}

function write($filename, $data, $name, $lang, res, start) {
  fs.writeFile($filename, $data, (err) => {
    if (err) throw err;
    var $cat = "cat " + $filename;

    var $cmd =
      $cat +
      " |  docker run -i --name " +
      $name +
      " glot/" +
      $lang +
      "  /bin/bash -c 'cat' ";

    const exec = cp.exec;
    var process = exec($cmd);

    process.stdout.on("data", (output) => {
      var data = JSON.parse(output);
      var end = new Date();
      var time = end - start;
      data.time = time;
      var result = JSON.stringify(data);
      console.log(result);
      res.send(result);
    });
    process.stderr.on("data", (error) => {
      console.log("Error - " + error.toString());
      res.json({ success: false, error: error.toString() });
    });

    setTimeout(stop, 20000, $name);
  });
}
