const mongoose=require("mongoose");

const contactSchema=mongoose.Schema({
name:{
    type: String,
    required: [true, "add contact name"],
},
email:{
    type: String,
    required: [true, "add email"],
},
phone:{
    type: String,
    required: [true, "add phone"],
},
},
{
    timestamps: true,
}
);

module.exports=contactSchema;