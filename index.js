import Express from "express";
import run from "./lib/run.js";
import engine from "./lib/engine.js";
import boot from "./lib/boot.js";
import bodyParser from "body-parser";

const app = Express();
const port = 3000;

app.use(bodyParser.urlencoded({ 
    extended:true
})); 

app.get("/",(req,res)=>{
    var start = new Date()
    var payload = boot(req.query);
    
    if(payload){
        var data = engine(req.query.lang,payload,req.query.name);
        var end = new Date();
        var time = end - start;
        data.time = time;
        res.send(data);
    }else{
        res.send("You are not authorized to used this application");
    }
    
});

app.post("/hello",(req,res)=>{
    res.send("hello post");
});
app.get("/hello",(req,res)=>{
    res.send("hello get");
});
app.post("/",(req,res)=>{
    var start = new Date()
    console.log(req.body)
    var payload = boot(req.body);
    res.send(payload);
    console.log(payload)
    if(payload){
        var data = engine(req.body.lang,payload,req.body.name);
        var end = new Date();
        var time = end - start;
        data.time = time;
        res.send(data);
    }else{
        res.send("You are not authorized to used this application");
    }
    
});


app.get("/code",(req,res)=>{
    var start = new Date()
    var str = run();
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