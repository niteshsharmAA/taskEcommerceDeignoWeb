const mongoose=require('mongoose')

let categoryschema= mongoose.Schema({

    name:{
        type:String
    },

     category:{
       type: mongoose.Schema.Types.ObjectId,
       default:null
    },
     isDeleted:{
        type:Boolean,
        default:false
    }
  
})

module.exports=new mongoose.model('category',categoryschema)

