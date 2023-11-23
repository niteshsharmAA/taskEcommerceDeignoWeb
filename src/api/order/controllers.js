const services=require('./services')
const {cartModel,orderModel,addressModel}=require('../../models/index')
const {create,updateMany,updateOne,findOne,find}=require('../../utils/dbOperations')


exports.payOrder=async({user,body})=>{
 

      const cartData=await services.cartDataSer(user)
     
      if (cartData[0]) {

        let address = await findOne(addressModel,{ userId: user._id });

        let order=Math.round(Math.random()*10000000000)
        const orderData = await orderModel({
          userId: user._id,
          product: cartData.map((item) => {
            return item;
          }),
          addressId: address,
          total: body.finalprice,
          orderId: order,
          orderDate: Date.now(),
        });
        let savedata = await orderData.save();
        let removeCartItem = await updateMany(cartModel,{ userId: user._id },{isDeleted:true});
        return{
            statusCode:200,
            status:true,
            message:"Order Succssefuly",
            data:savedata
        }
      }else{
        return{
            statusCode:400,
            status:false,
            message:"No product found to order",
            data:{}
        }
      }
}