let mongoose = require("mongoose");
let addressSchema = mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  address: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
});

let addressModel = mongoose.model("addressmodel", addressSchema);
module.exports = addressModel;
