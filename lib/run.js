import shelljs from "shelljs";
import fs from "fs";

export default function run($cmd=null,$query)
{
    if($cmd=='remove_docker'){
        var data = shelljs.exec('docker rm $(docker ps -a -q)');
        return JSON.parse(data);
    }else if($cmd=='stop_docker'){

    }
    else if($cmd=='stop_docker_id'){
        
    }
    else{
        var data = shelljs.exec('cat sample.json | docker run -i glot/java bin/bash -c "cat"');
        return JSON.parse(data);
    }
    
};