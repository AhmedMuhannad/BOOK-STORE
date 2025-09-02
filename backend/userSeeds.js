const mongoose = require("mongoose");
const User = require("./models/user");
mongoose.connect("mongodb+srv://amohned346:KJKDsSxLEeHjYova@cluster0.ma3bbjx.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
try{
    const user1 = await new User({
        email:"ahmed@gmail.com",
        password:"12345678",
        name:"ahmed",
        isAdmin:false
    }).save()
    
}catch(err){}