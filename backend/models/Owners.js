const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   mobile_no:{
    type:Number,
    required:true
   },
   email:{
      type:Number,
   },
   address:{
    type:String,
    required:true
   },
   owner_type:{
    type:String,
    required:true
   }
},{timestamps:true});

module.exports = mongoose.model('Owner',ownerSchema);