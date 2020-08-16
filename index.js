import Express from "express";
import Run from "./lib/run.js"
import shelljs from "shelljs";



const app = Express();
const port = 3000;



app.get("/",(req,res)=>{
    res.send("Server to run coding - Krishna Teja ");
});

app.get("/code",(req,res)=>{
    //res.send("hello world");
    const str = Run();
    console.log(str.stdout);
    console.log(req.query.sample)
    res.send(str);
});

app.get("/hello",(req,res)=>{
    //res.send("hello world");
    const str = shelljs.exec('echo "hello"');
    res.send(str);
});
app.get("/ls",(req,res)=>{
    //res.send("hello world");
    const str = shelljs.exec('ls');
    const r = str.replace('\n','<br>');
    res.send(r);
});

app.get("/whoami",(req,res)=>{
    //res.send("hello world");
    const str = shelljs.exec('whoami');
    const r = str.replace('\n','<br>');
    res.send(r);
});

app.get("/hello-world",(req,res)=>{
    //res.send("hello world");
    const str = shelljs.exec('sudo docker run hello-world');
    res.send(str);
});

console.log("hello world KT")

app.listen(port, ()=>{ console.log("Listening on port "+port)})