const  mongoose=require('mongoose');


const Schema= mongoose.Schema({
    userid:String,
    password:String,
    notes: [
        {
            title: String,
            data: String
        }
    ]
})

const user=mongoose.model("user",Schema);
module.exports=user;