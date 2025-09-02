const mongoose  = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email: {type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
userSchema.methods.matchPasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})
module.exports = mongoose.model('User', userSchema);
