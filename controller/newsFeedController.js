import { NewsFeed } from '../modules';
import CustomErrorHandler from "../services/CustomErrorHandler";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const newsFeedController = {

    async listNewsFeed(req, res, next) {
        try {  
            let matchArr = [];
            if(req.body.searchBy == "author"){
                matchArr.push({author_id:ObjectId(req.body.searchValue)})
            }
            if(req.body.searchBy == "technology"){
                matchArr.push({category_id:ObjectId(req.body.searchValue)})
            }          
            let aggregationRes = [
                { $match    : { $and: matchArr } },
                {
                    $lookup: {
                        from: 'authors',
                        localField: "author_id",
                        foreignField: "_id",
                        as: "autherRes"
                    }
                },
                {
                    "$unwind": "$autherRes"
                },
                {
                    "$project": {
                        "_id": 1,
                        "headline": 1,
                        "thumbnail": 1,
                        "category_id": 1,
                        "author_id": 1,
                        "createdAt": 1,
                        "autherRes.name": 1
                    }
                }
            ];
            let skip = 0;
            let limit = 2;
            let sortField = "createdAt";
            let sortOrder = -1;
            if (req.body.skip) {
                skip = req.body.skip;
            }
            if (req.body.limit) {
                limit = req.body.limit;
            }
            if (req.body.sortField) {
                skip = req.body.sortField;
            }
            if (req.body.sortOrder == "DESC") {
                sortOrder = -1;
            }
            if (req.body.sortOrder == "ASC") {
                sortOrder = 1;
            }
            const totalRes = await NewsFeed.aggregate(aggregationRes)
            aggregationRes.push({ $sort: { [sortField]: sortOrder } })
            aggregationRes.push({ $skip: skip })
            aggregationRes.push({ $limit: limit })
            const newsFeed = await NewsFeed.aggregate(aggregationRes);

            res.json({ data: newsFeed, totalRecord: totalRes.length });
        } catch (err) {
            return next(err);
        }
    },
    async generateNewsFeed(req, res, next) {
        try {

            const author = await NewsFeed.create([
                { headline: "Loerm Ipsum 11", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980aef", author_id: "620df097ccd69d37a8c81b76" },
                { headline: "Loerm Ipsum 12", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980aef", author_id: "620df097ccd69d37a8c81b78" },
                { headline: "Loerm Ipsum 13", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980aee", author_id: "620df097ccd69d37a8c81b77" },
                { headline: "Loerm Ipsum 14", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980aee", author_id: "620df097ccd69d37a8c81b7a" },
                { headline: "Loerm Ipsum 15", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980af0", author_id: "620df097ccd69d37a8c81b79" },
                { headline: "Loerm Ipsum 16", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980af0", author_id: "620df097ccd69d37a8c81b76" },
                { headline: "Loerm Ipsum 17", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980af1", author_id: "620df097ccd69d37a8c81b78" },
                { headline: "Loerm Ipsum 18", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980af1", author_id: "620df097ccd69d37a8c81b77" },
                { headline: "Loerm Ipsum 19", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980af2", author_id: "620df097ccd69d37a8c81b7a" },
                { headline: "Loerm Ipsum 20", thumbnail: "https://picsum.photos/200", category_id: "620df343bf267e3f44980af2", author_id: "620df097ccd69d37a8c81b79" }
            ]);
            res.json(author);

        } catch (err) {
            return next(err);
        }
    }
};

export default newsFeedController;