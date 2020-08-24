import shelljs from "shelljs";
import fs from "fs";
import  json  from "express";

export default function pythonrun($image,$name)
{
    
    var $filename = 'images/'+$name+'.jpg';
    if($image)
        write($filename,$image);

    //if($name!=1)
       // setTimeout(removeimage, 20000, $name);
   
    var $cmd = "python3 yolo.py --image "+$filename+" --yolo yolo-coco";
    console.log($cmd);
    var count = shelljs.exec($cmd);
    var data = [];
    data['count'] =  count.toString();
    data['image'] = base64_encode($filename)
    return data;
};


function removeimage($name){
    fs.unlinkSync('images/'+$name+'.jpg');
}

function write($file,$data){
    var base64Data = $data.replace(/^data:image\/png;base64,/, "");

    fs.writeFileSync($file, base64Data, 'base64', function(err) {
    console.log(err);
    });
    
}

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function base64(file) {
    const base64 = fs.readFileSync(file, 'base64');
}
