import shelljs from "shelljs";
import fs from "fs";
import  json  from "express";

export default function Run()
{
    read('sample.json');
    const str = '{"language": "python","command":"python main.py ", "files": [{"name": "main.py", "content": "n=10 \nprint(n)"}]}';
    write('json/sample.json',str);
    var data = shelljs.exec('cat sample.json | docker run -i glot/java bin/bash -c "cat"');
    return JSON.parse(data);
};

function read($file){
    fs.readFile($file, 'utf8',function(err, data) { 
        if (err) throw err; 
        const users = JSON.parse(data); 
        console.log(data); // Print users  
    }); 

    
}

function write($file,$data){
    fs.writeFile($file, $data, err => { 
     
        // Checking for errors 
        if (err) throw err;  
       
        console.log("Done writing"); // Success 
    }); 
}
