const { productModel, cartModel } = require('../../models/index')
const { findOne, create, updateOne, find } = require('../../utils/dbOperations')
const { fixLink } = require("../../utils/fileUploader")
const services = require('./services')
exports.addToCart = async ({ body, user }) => {

  let findData = await findOne(productModel, { _id: body.itemId });

  if (!findData) {
    return {
      statusCode: 400,
      status: false,
      message: "cant Find Product",
      data: {}
    }
  }
  let check = await findOne(cartModel, {
    userId: user._id,
    itemId: body.itemId,
  });

  if (check) {
    return {
      statusCode: 400,
      status: false,
      message: "Product are already in cart",
      data: {}
    }
  }

  body.price = findData.price
  body.quantity = 1
  body.userId = user._id
  await create(cartModel, body)
  let cart = await find(cartModel, { userId: user._id })
  return {
    statusCode: 200,
    status: 200,
    message: "Category List",
    data: cart
  }


}

exports.cartItem = async ({ user, hostname }) => {
 
  let data = await services.cartItemSer(user._id)
  data = fixLink({ data: data, hostname, fieldName: "image", folderName: "Product" })
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    let oneItem = data[i].price * data[i].quantity;
    total += oneItem;
  }
  let item = {
    data,
    total
  }
  return {
    statusCode: 200,
    status: 200,
    message: "cart item",
    data: item
  }
}

exports.updateItemFromCart = async ({ user, hostname, body }) => {

  let findData = await findOne(productModel, { _id: body.itemId });
  if (!findData) {
    return {
      statusCode: 400,
      status: false,
      message: "cant Find Product",
      data: {}
    }
  }
  let check = await findOne(cartModel, {
    userId: user._id,
    itemId: body.itemId,
  });


  if (body.increment) {
   let a= await updateOne(cartModel, { _id: check._id }, { $inc: { quantity: 1 } });
    return {
      statusCode: 200,
      status: 200,
      message: "Item Quantity Increase Successfully",
      data: a
    }
  } else {
    let a=await updateOne(cartModel, { _id: check._id }, { $inc: { quantity: -1 } });
    return {
      statusCode: 200,
      status: 200,
      message: "Item Quantity Decrease Successfully",
      data: a
    }
  }

}

exports.removeItemFromCart = async ({ user, body }) => {
  let findData = await findOne(productModel, { _id: body.itemId });

  if (!findData) {
    return {
      statusCode: 400,
      status: false,
      message: "cant Find Product",
      data: {}
    }
  }
  let check = await findOne(cartModel, {
    userId: user._id,
    itemId: body.itemId,
  });

  if(check){
    await updateOne(cartModel,{_id:check._id},{isDeleted:true})
    return {
      statusCode: 200,
      status: true,
      message: "Item Remove From Cart SuccessFully",
      data: {}
    }
  }else{
    return {
      statusCode: 400,
      status: false,
      message: "Not Fount This Item in Cart",
      data: {}
    }
  }
}