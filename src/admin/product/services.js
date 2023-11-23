let {productModel}=require('../../models/index')
exports.productDataSer=async()=>{
    let pipeline=[]

    pipeline.push({
        $match:{
            isDeleted:false
        }
    })
    pipeline.push( {
          $lookup: {
            from: "categories",
            let: {
              category: "$category",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$category"],
                  },
                },
              },
            ],
            as: "result",
          },
        }
     )

     pipeline.push({$unwind:{
        path:"$result"
     }})

     pipeline.push({
        $project: {
          productName: 1,
          image: 1,
          price: 1,
          category: "$result.name",
        },
      })

      return await productModel.aggregate(pipeline)
}