import Express from "express";
import Run from "./lib/run.js"



const app = Express();
const port = 3000;



app.get("/",(req,res)=>{
    res.send("Server to run coding");
});

app.get("/code",(req,res)=>{
    //res.send("hello world");
    const str = Run();
    console.log(str.stdout);
    console.log(req.query.sample)
    res.send(str);
});
console.log("hello world KT")

app.listen(port, ()=>{ console.log("Listening on port "+port)})