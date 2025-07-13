import {readdir, stat} from "fs/promises"
import path from "path"; 
export const getDirList = async(currPath, pathList)=>{
    const isdir = await stat(currPath); 
    if(!isdir.isDirectory()){
        pathList.path.push(currPath); 
        return pathList; 
    } 
    const dirList = await readdir(currPath);
    await Promise.all(dirList.map((item, index)=>getDirList(path.join(currPath, item), pathList)))  
    return pathList; 
}

export const isDirectory = async(dirPath)=>{
    try{
        const stats = await stat(dirPath); 
        return stats.isDirectory(); 
    }catch(err){
        if(err.code === "ENOENT"){
            return false; 
        }
        throw err; 
    }
}
