const mongoose= require("moongose");

const userSchema= mongoose.schema({
    username:{

        type: String,
        required: [true, "add username"],
    },
    email: {
        type: String,
        required: [true, "add email"],
        unique:[true, "email already taken"],
    },
    password:{
        type: String,
        required: [true, "add password"],
    },
},
    {
        timestamps: true,
    }
    
);

module.exports = mongoose.model("User", userSchema)