import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const authorSch = new Schema({
    name: { type: String, required: true }
},
    { timestamps: true })

export default mongoose.model('Author', authorSch, 'authors')