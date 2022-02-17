import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const newsfeedSch = new Schema({
    headline: { type: String, required: true },
    thumbnail: { type: String, required: true},
    category_id: { type: mongoose.ObjectId, required: true },
    author_id:{type:mongoose.ObjectId,required:true}
},
    { timestamps: true })

export default mongoose.model('NewsFeed', newsfeedSch, 'news_feed')