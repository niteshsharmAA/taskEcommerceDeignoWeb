const fs=require('fs')
const path=require('path')
const routes=[]
for(let folder of fs.readdirSync(__dirname)){
    const pathFolder=path.join(__dirname,folder)
    if(fs.lstatSync(pathFolder).isDirectory()){
routes.push(require(path.join(pathFolder,"routes")))
    }
}

module.exports=routes