import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name : { required: true, type: String, maxLength: 25, minLength: 3},
    last_name  : { required: true, type: String, maxLength: 25, minLength: 3},
    email      : { type : String , required: true, unique : true },
    phone      : { type: Number },
    address    : { type : String},
    role       : {
          type : String,
          enum : [ 'admin', 'moderator']
    },
    password   : {
        type   : String, required : true,
    },
    // resetToken : String
})

const user = mongoose.model('User', userSchema);

export default user;