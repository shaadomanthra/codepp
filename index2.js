import cp from "child_process";
const exec = cp.exec;
const args = ["run", "-i", "glot/mono"];
var $payload =
  '{"language":"csharp","command":"mcs -out:a.exe main.cs && mono a.exe ", "files": [{"name": "main.cs", "content": "using System;\\\n class HelloWorld\\\n { static void Main()\\\n { Console.Write(\\"Hello World,\\");}}"}]}';

// var echo = spawn("echo", [
//   'class Main {public static void main(String[] args) {System.out.println("Hello World!");}}',
// ]);
// // var echo = spawn("echo", ["The quick brown fox\njumped over the lazy dog."]);
// var grep = spawn("docker", args);

// echo.stdout.pipe(grep.stdin);
// grep.stdout.pipe(process.stdin);

var process = exec("printf %s '" + $payload + "' > file.json | cat file.json ");

// var process = exec(
//   "cat json/415.json | docker run -i glot/java /bin/bash -c cat"
// );

//sconsole.log($payload.replace(/\n/g, "\\n"));
// var p = exec("echo '" + $payload.replace(/\n/g, "\\n") + "'");

// p.stdout.on("data", (output) => {
//   // var data = JSON.parse(output);
//   // var result = JSON.stringify(data);
//   console.log(output);
// });

// console.log($payload);

process.stdout.on("data", (output) => {
  var data = JSON.parse(output);
  var result = JSON.stringify(data);
  console.log(result);
});
process.stderr.on("data", (error) => {
  console.log("Error - " + error.toString());
});
