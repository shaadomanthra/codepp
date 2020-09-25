import shelljs from "shelljs";
import fs from "fs";
import json from "express";

export default function engine($lang, $payload, $name = null) {
  if (!$name) var $name = Math.floor(Math.random() * 1000 + 1);

  if ($lang == "csharp") $lang = "mono";
  if ($lang == "javascript") $lang = "node";

  var $filename = "json/" + $name + ".json";
  write($filename, $payload);

  var $cat = "cat " + $filename;

  var $cmd =
    $cat +
    " |  docker run -i --name " +
    $name +
    " glot/" +
    $lang +
    "  /bin/bash -c 'cat' ";
  var data = shelljs.exec($cmd);
  setTimeout(stop, 20000, $name);
  return JSON.parse(data);
}

function stop($name) {
  fs.unlinkSync("json/" + $name + ".json");
  shelljs.exec("docker container stop -t 10 " + $name);
  shelljs.exec("docker rm $(docker ps -a -q)");
}

function write($file, $data) {
  fs.writeFileSync($file, $data, (err) => {
    if (err) throw err;
  });
}
