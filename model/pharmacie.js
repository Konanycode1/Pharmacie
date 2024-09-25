const {Schema,model} =  require("mongoose");

const pharmacieSchema = Schema({
    nomPrenom : {type: String, },
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
module.exports = model("pharmacieSchema",userSchema);