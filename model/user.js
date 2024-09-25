const {Schema,model} =  require("mongoose");

const userSchema = Schema({
    nom : {type: String, required: true},
    prenom : {type: String, required: true},
    numero : {type: String, required: true},
    fonction : {type: String, required: true},
    ville : {type: String, required: true},
    password: {type:String, required:true},
    pays : {type: String, required: true},
    role: { 
        type: String, 
        enum: ["Utilisateur","Pharmacie","Admin","SuperAdmin"],
        default: "Utilisateur"
      },
},
{ timestamps: true }
)
module.exports = model("User",userSchema);