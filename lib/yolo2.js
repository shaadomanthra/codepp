import shelljs from "shelljs";
import fs from "fs";
import json from "express";
import cp from "child_process";

export default function pythonrun($image, $name, res) {
  var start = new Date();
  var $filename = "images/" + $name + ".jpg";
  if ($name != 1) setTimeout(removeimage, 30000, $filename);
  if ($image) write($filename, $image, res, start);
}

function removeimage($name) {
  console.log($name);
  fs.unlink($name, (err) => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file: " + $name);
    }
  });
  return 1;
}

function write($filename, $data, res, start) {
  var base64Data = $data.replace(/^data:image\/png;base64,/, "");
  console.log($filename);
  fs.writeFile($filename, base64Data, "base64", (err) => {
    if (err) throw err;
    console.log("yes");
    var $cmd = "python3 yolo.py --image " + $filename + " --yolo yolo-coco";
    console.log($cmd);

    const exec = cp.exec;
    var process = exec($cmd);

    process.stdout.on("data", (output) => {
      var data = [];
      data["count"] = output.person;
      data["cell_phone"] = output.cell_phone;
      data["image"] = base64_encode($filename);
      var end = new Date();
      var time = end - start;
      data["time"] = time.toString();
      var response = {};
      response["image"] = data["image"];
      response["count"] = data["count"];
      response["cell_phone"] = data["cell_phone"];
      response["time"] = data["time"];

      console.log(JSON.stringify(response));
      res.send(response);
    });
    process.stderr.on("data", (error) => {
      console.log("Error - " + error.toString());
      var data = [];
      data["count"] = 0;
      data["image"] = null;
      data["time"] = null;
      data["cell_phone"] = 0;

      res.send(data);
    });
  });
}

// function to encode file data to base64 encoded string
function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

function base64(file) {
  const base64 = fs.readFile(file, "base64");
}
