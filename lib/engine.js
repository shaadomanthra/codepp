import shelljs from "shelljs";
import fs from "fs";
import  json  from "express";

export default function engine($lang,$payload,$name=null)
{
    if(!$name)
        var $name = Math.floor((Math.random() * 1000) + 1);
        
    if($lang=='csharp')
        $lang = 'mono';
    
    var $filename = 'json/'+$name+'.json';
    write($filename,$payload);

    var $cat = 'cat '+$filename;
    
    var $cmd = $cat+" |  docker run -i --name "+$name+" glot/"+$lang+"  /bin/bash -c 'cat' ";
    var data = shelljs.exec($cmd);
    

    return JSON.parse(data);
};


// function read($file){
//     fs.readFile($file, 'utf8',function(err, data) { 
//         if (err) throw err; 
//         const users = JSON.parse(data); 
//         console.log(data); // Print users  
//     }); 
// }

function write($file,$data){
    fs.writeFileSync($file, $data, err => { 
     
        // Checking for errors 
        if (err) throw err;  
       
        console.log("Done writing"); // Success 
    }); 
}
