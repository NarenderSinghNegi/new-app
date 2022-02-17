import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usersSch = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{type:String,required:true},
    birth_date: { type: String, required: true },
    birth_time: { type: String, required: true },
    gender: { type: String, required: true },
    marital_status: { type: String, required: true },
    language: { type: String, required: true },
    profile_picture: { type: String },
},
    { timestamps: true })

export default mongoose.model('User', usersSch, 'users')