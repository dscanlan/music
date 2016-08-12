const jwt = require('jwt-simple'),
config = require('../config'),
User = require('../models/users');

function tokenForUser(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({sub: user._id, iat: timeStamp}, config.secret);
}

module.exports = {
    signIn: (req, res) => {
        if(!req.user){
            return res.status(422).send('incorrect username and password')
        }
        res.send({token: tokenForUser(req.user)});
    },
    signUp: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password){
            return res.status(422).send('Please provide a username and password');
        }

        User.findOne({email}, (err, user) => {
            if(err){
                return next(err);
            }

            if(user){
                return res.status(422).send('Username is already in use');
            }

            const newUser = new User ({
                email,
                password,
                kickDrum: null,
                rockMale: null,
                vocalCompressor: null
            });
            newUser.save((err) =>{
                if(err){
                    return next(err);
                }
                res.json({token: tokenForUser(newUser)});
            });
        })
    }
}