import Joi from 'joi';
import bcrypt from 'bcrypt';
import { User } from '../../modules';
import CustomErrorHandler from "../../services/CustomErrorHandler";

const userController = {
    async addUser(req, res, next) {
        //Validation

        const userSchema = Joi.object({
            username: Joi.string().min(5).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/),
            con_password: Joi.ref('password'),
            phone: Joi.number().greater(9).required(),
            birth_date: Joi.date().greater('1-1-1974'),
            birth_time: Joi.date().timestamp(),
            gender: Joi.string().valid('M', 'F', 'O').required(),
            marital_status: Joi.string().valid('S', 'M').required(),
            language: Joi.string().valid('H', 'E').required()
        });
        const { error } = userSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        
        const { password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // prepare the model
        if(req.body.password){
            req.body.password = hashedPassword;
        }
        const user = await User.findOne({ email: req.body.email });        
        if (!user) {
            const user = new User(req.body);
        }else{
            user.username       =   req.body.username;
            user.email          =   req.body.email;
            if(req.body.password){
                user.password       =   req.body.password;
            }            
            user.phone          =   req.body.phone,
            user.birth_date     =   req.body.birth_date;
            user.birth_time     =   req.body.birth_time;
            user.gender         =   req.body.gender;
            user.marital_status =   req.body.marital_status;
            user.language       =   req.body.language;
        }        

        try {
            const result = await user.save();
            res.json({data:result});
            
        } catch (err) {
            return next(err);
        }
    },


    
};

export default userController;