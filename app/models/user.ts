import mongoose, {Schema , models, model} from "mongoose"
import bcrypt from "bcryptjs"

export interface Usertype {
    email : string,
    password : string,
    id? : mongoose.Types.ObjectId,
    createdAt? : Date,
    updatedAt? : Date
}

const userSchema = new Schema<Usertype>({
    email : {type : String , required : true, unique : true},
    password : {type : String , required : true}
},{
    timestamps : true
})

userSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

const User = models?.User || model<Usertype>("User",userSchema)

export default User