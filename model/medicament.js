import {Schema,model} from "mongoose";

const userSchema = Schema({
    serie : {type: String, default:null},
    nomProd : {type: String, required: true},
    description:{type: String, default:true},
    user: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    }
},
{ timestamps: true }
)
module.exports = model("User",userSchema);