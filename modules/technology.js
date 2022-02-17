import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const technologySch = new Schema({
    name: { type: String, required: true }
},
    { timestamps: true })

export default mongoose.model('Technology', technologySch, 'technologies')