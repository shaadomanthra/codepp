import Express from "express";
import Run from "./lib/run.js"
import shelljs from "shelljs";



const app = Express();
const port = 3000;


app.get("/",(req,res)=>{
    res.send("Server to run coding - Krishna Teja ");
});

app.get("/code",(req,res)=>{
    var start = new Date()
    var str = Run();
    var end = new Date();
    var time = end - start;
    str.time = time;
    console.info('Execution time: %dms', time)
    console.log(str.stdout);
    console.log(req.query.sample)
    res.send(str);
});

app.get("/hello",(req,res)=>{
    //res.send("hello world");
    const str = shelljs.exec('echo "hello"');
    res.send(str);
});


console.log("hello world KT")

app.listen(port, ()=>{ console.log("Listening on port "+port)})