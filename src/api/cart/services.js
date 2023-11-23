const { Types } = require("mongoose")
const{cartModel}=require('../../models/index')
exports.cartItemSer=async(user)=>{
    let pipeline=[]

    pipeline.push(  {
        $match: {
            isDeleted:false,
          userId: new Types.ObjectId(user),
        },
      })

      pipeline.push(  {
        $lookup: {
          from: "products",
          let: {
            itemId: "$itemId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$itemId"],
                },
              },
            },
          ],
          as: "result",
        },
      })

      pipeline.push(  {
        $unwind: {
          path: "$result",
        },
      })

      pipeline.push( {
        $project: {
          name: "$result.productName",
          image: "$result.image",
          itemId: 1,
          price: 1,
          quantity: 1,
          userId: 1,
        },
      })

      return await cartModel.aggregate(pipeline)
}