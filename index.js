import Express from "express";
import Products from "./products.js";

const app = Express();
const port = 3000;

app.get("/",(req,res)=>{
    res.send("hello world Teja");
});

app.get("/:id",(req,res)=>{
    //res.send("hello world");
    res.send(req.params);
});
console.log("hello world KT")

app.listen(port, ()=>{ console.log("Listening on port 3000")})