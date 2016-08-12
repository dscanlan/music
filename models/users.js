const mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt-nodejs');

//define model
const userSchema = new Schema({
    //ensure uniqueness and force lowercase!
    email: { type: String, unique: true, lowercase: true } ,
    password: String,
    kickDrum: {type: Schema.Types.ObjectId, ref: 'kickDrum'},
    rockMale: {type: Schema.Types.ObjectId, ref: 'rockMale'},
    vocalCompressor: {type: Schema.Types.ObjectId, ref: 'vocalCompressor'}
});

userSchema.pre('save', function(next){
    const user = this;
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err){
            return callback(err);
        }

        callback(null, isMatch);
    });
}

//create model class
const ModelClass = mongoose.model('user', userSchema); 


//export model
module.exports = ModelClass;