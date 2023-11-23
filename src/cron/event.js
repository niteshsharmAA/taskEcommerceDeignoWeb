const {planModel,userModel,buyPlanModel}=require('../models/index')
// const {ORDER, NOTIFICATION}=require('../config/constants')
// const { getUser } = require("../utils/globalServices");
const { updateOne, updateMany,find,findOne } = require("../utils/dbOperations");
// const Notification = require('../utils/notificationHandler');
const call=async()=>{
//    await changeOrderStatus(ORDER.STATUS.STARTED,ORDER.STATUS.NOT_CONNECTED,50)
  await  dailyWinning()
}

// const changeOrderStatus = async (currentStatus, changeStatus, waitTime) => {
//     let pipeline = []
//     pipeline.push({
//         $match:
//           {
//             status: currentStatus,
//           },
//       })
//       pipeline.push({
//         $addFields: {
//           time: {
//             $dateDiff: {
//               startDate: "$updatedAt",
//               endDate: new Date(),
//               unit: "second",
//             },
//           },
//         },
//       })
//       pipeline.push({
//         $match:
//           {
//             time: {
//               $gte: waitTime,
//             },
//           },
//       })
//     pipeline.push({
//         $group: {
//           _id: null,
//           idToUpdate: {
//             $addToSet: "$_id",
//           },
//         },
//       })

//       const data = await orderModel.aggregate(pipeline)
//       if (data.length && data[0].idToUpdate)
//       {
//         await updateMany(orderModel, {_id: {$in: data[0].idToUpdate}}, {status: changeStatus})
//       }
// }

const dailyWinning=async({user})=>{

  let pipeline=[]
  pipeline.push({
    $match: {
      _id: Types.ObjectId(user._id),
    },
  })

  pipeline.push({
    $graphLookup: {
      from: "users",
      startWith: "$referBy",
      connectFromField: "referBy",
      connectToField: "_id",
      maxDepth: 6,
      depthField: "level",
      as: "referralChain",
    },
  })

  pipeline.push({
    $unwind: "$referralChain",
  })

  pipeline.push({
    $addFields: {
      level: {
        $subtract: ["$referralChain.level", 0],
      },
    },
  })

  pipeline.push( {
    $group: {
      _id: "$level",
      usersAtLevel: {
        $push: "$referralChain",
      },
    },
  })

  pipeline.push({
    $addFields: {
      usersAtLevel: {
        $slice: ["$usersAtLevel", 20],
      },
    },
  })

  pipeline.push({
    $sort: {
      _id: 1,
    },
  })

  const q=await planModel.aggregate(pipeline)

let planBuy=await find(buyPlanModel,{userId:_id})
if(planBuy.length>0){

}


 let idToUpdate = []
  for(let i=0;i<q.length;i++){
    idToUpdate.push(q[i].queue._id)
    new Notification(NOTIFICATION.TYPE.QUEUE, q[i].queue).sendToSingleUser(q[i].queue.user);
  }
  await updateMany(userModel, {_id: {$in: idToUpdate}}, {status: ORDER.STATUS.STARTED})
}

module.exports=async()=>{
    await call()
}