import cp from "child_process";
const exec = cp.exec;
const args = ["run", "-i", "glot/java"];
var $c =
  '{"language":"csharp","command":"mcs -out:a.exe main.cs && mono a.exe ", "files": [{"name": "main.cs", "content": "using System; class HelloWorld { static void Main() { Console.Write(\\"Hello World,\\");}}"}]}';

// var echo = spawn("echo", [
//   'class Main {public static void main(String[] args) {System.out.println("Hello World!");}}',
// ]);
// // var echo = spawn("echo", ["The quick brown fox\njumped over the lazy dog."]);
// var grep = spawn("docker", args);

// echo.stdout.pipe(grep.stdin);
// grep.stdout.pipe(process.stdin);

child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

child.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
