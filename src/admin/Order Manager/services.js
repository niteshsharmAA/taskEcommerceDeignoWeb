const {orderModel}=require('../../models/index')
exports.orderListSer=async()=>{

    let pipeline=[]
    pipeline.push( {
        '$lookup': {
          'from': 'users', 
          'let': {
            'user': '$userId'
          }, 
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$_id', '$$user'
                  ]
                }
              }
            }
          ], 
          'as': 'result'
        }
      })

      pipeline.push({
        '$unwind': {
          'path': '$result'
        }
      })

      pipeline.push( {
        '$project': {
          'paymentStatus': 1, 
          'orderId': 1, 
          'name': '$result.name', 
          'phone': '$result.phone', 
          'total': 1, 
          'orderDate': {
            '$dateToString': {
              'date': '$orderDate', 
              'format': '%Y-%m-%d'
            }
          }
        }
    })

    console.log(JSON.stringify(pipeline))
    return await orderModel.aggregate(pipeline)
}

exports.orderItemSer=async(query)=>{
    let pipeline=[]
    pipeline.push(  {
        '$match': {
          'orderId': `${query.orderId}`
        }
      })

      pipeline.push({
        '$unwind': {
          'path': '$product'
        }
      })

      pipeline.push({
        '$lookup': {
          'from': 'products', 
          'let': {
            'user': '$product.itemId'
          }, 
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$_id', '$$user'
                  ]
                }
              }
            }
          ], 
          'as': 'result'
        }
      })

      pipeline.push(  {
        '$unwind': {
          'path': '$result'
        }
      })

      pipeline.push(  {
        '$project': {
          'Name': '$result.productName', 
          'image': '$result.image', 
          'price': '$result.price',
          'quantity':'$product.quantity'
        }
      })

      return await orderModel.aggregate(pipeline)
}