const fs=require('fs')
const path=require('path');
const models={}

for(let file of fs.readdirSync(__dirname))
{
    const pathToFile=path.join(__dirname,file)
    if(file !== 'index.js'){
        models[file.split(".")[0]]=require(pathToFile)
    }
}

module.exports=models
