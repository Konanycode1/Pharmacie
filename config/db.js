const mongoose = require("mongoose") ;
const { inProduction } = require("./env.js") ;

const connectDB = async ()=>{
    let MONGO_URI = process.env.MONGO_URI;
    if(!MONGO_URI) throw new Error("Mongo uri introuvable!!!")
    await mongoose.connect(MONGO_URI, {
        dbName: inProduction? "oukami":"oukamiTest"
    })
}
module.exports ={
    connectDB
}