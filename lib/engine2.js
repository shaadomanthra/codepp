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

  const exec = cp.exec;
  var process = exec(
    "echo '" + $payload + "' |  docker run -i  glot/java /bin/bash -c"
  );

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
}

function stop($name) {
  //fs.unlinkSync("json/" + $name + ".json");
  shelljs.exec("docker container stop -t 10 " + $name);
  shelljs.exec("docker rm $(docker ps -a -q)");
}

function write($file, $data) {
  fs.writeFileSync($file, $data, (err) => {
    if (err) throw err;
  });
}
