const {cartModel}=require('../../models/index')
const{Types}=require('mongoose')
exports.cartDataSer=async(user)=>{

    let pipeline=[]
    pipeline.push(  {
        $match: {
            isDeleted:false,
          userId: new Types.ObjectId(user._id),
        },
      })

      pipeline.push({
        $project: {
          userId: 0,
        },
      })

      return await cartModel.aggregate(pipeline)
}