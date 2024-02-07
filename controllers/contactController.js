const asyncHandler= require("express-async-handler");
const contactSchema=require("../models/contactModel");

const getContacts=asyncHandler(async(req, res)=>{
    const contact=await contactSchema.find();
res.status(200).json({
    message: "get contacts"
});
});

const getContact=asyncHandler(async(req, res)=>{
    const contact=await contactSchema.findById(req.params.id);
    if(!contact){
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const CreateContacts=asyncHandler(async(req, res)=>{
    console.log("requested", req.body);
    const{name, email, phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("fields are mandatory");
    }
    const contact= await contactSchema.create({
        name, email, phone
    });
    res.status(201).json(contact) ;
});

const updateContacts=asyncHandler(async(req, res)=>{
    const contact=await contactSchema.findById(req.params.id);
    if(!contact){
        throw new Error("contact not found");
    }
    const updateContact= await contactSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
);
    res.status(200).json(contact);

});

const deleteContacts=asyncHandler(async(req, res)=>{
    const contact=await contactSchema.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact Not found!");

    }
    await contactSchema.remove();
    res.status(200).json(contact);
    });
module.exports = {getContacts,
getContact,
CreateContacts,
updateContacts,
deleteContacts};