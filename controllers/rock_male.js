
//require rock_male model.
const RockMale = require('../models/rock_male'),
//require user model
User = require('../models/users');

//as routes are using middleware they will receieve the authenticated user document in REQ.

module.exports = {
    //get individual document.
    getRockMale: (req, res) => {
        //read id from the params.
        const _id = req.params.id;
        //check that we do have one.
        if(!_id){
            //retrun error if not.
            return res.status(422).send('ID Not found');
        }
        //check that its a valid _id
        RockMale.findOne({_id}, (err, rockMale) =>{
            //error handle something wrong reading from DB
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            //_id does not exist. return error.
            if(!rockMale){
                return res.status(422).send('Error finding record'); 
            }
            //return the document.
            res.json(rockMale);
        });
    },
    //update document
    updateRockMale:(req, res) => {
        //read id from the params.
        const _id = req.params.id;
        //check that we do have one.
        if(!_id){
            //return error if not.
            return res.status(422).send('ID Not found');
        }
        //check that its a valid _id
        RockMale.findOne({_id}, (err, rockMale) =>{
            //error handle something wrong reading from DB
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            //_id does not exist. return error.
            if(!rockMale){
                return res.status(422).send('Error finding record'); 
            }
            
             //we have a document. Update the properties with props in body,
            rockMale.lowBand = req.body.lowBand;
            rockMale.lowPeak = req.body.lowPeak;
            rockMale.lowFreq = req.body.lowFreq;
            rockMale.lowGain = req.body.lowGain;

            rockMale.lowMidBand = req.body.lowMidBand;
            rockMale.lowMidHiLowQ = req.body.lowMidHiLowQ;
            rockMale.lowMidFreq = req.body.lowMidFreq;
            rockMale.lowMiGain = req.body.lowMiGain;

            rockMale.hiMidBand = req.body.hiMidBand;
            rockMale.hiMidFreq = req.body.hiMidFreq;
            rockMale.hiMidGain = req.body.hiMidGain;
            rockMale.hiBand = req.body.hiBand;
            rockMale.hiPeak = req.body.hiPeak;
            rockMale.hiFreq = req.body.hiFreq;
            rockMale.hiGain = req.body.hiGain; 

            //call save
            rockMale.save((err)=>{
                //error handling. 
                if(err){
                    return res.status(422).send('Error updating record'); 
                }
                //return the document.
                res.json(rockMale);
            })
        });
    },
    //delete document
    deleteRockMale: (req, res) => {
        //get values from req.
        const user = req.user;
        const _id = req.params.id;
        //check that we have a valid _id
        if(!_id){
            //return error if not.
            return res.status(422).send('ID Not found');
        }

        //call remove from the model with the _id
        RockMale.remove({_id: _id}, (err, result) => {
            //handle error and return
            if(err){
                return res.status(500).send('Error removing Preset');
            }
            //update the user document that rockMale is now null.
            user.rockMale = null;

            //save the user document.
            user.save((err)=>{
                if(err){

                }
            });

            //return success.
            res.status(200).send('Preset Removed Successfuly');
        });
    },
    //create document
    addRockMale: (req, res) => {
        //get the user from req.
        const user = req.user;
        //create new RockMale
        const rockMale = new RockMale({
            lowBand : req.body.lowBand,
            lowPeak : req.body.lowPeak,
            lowFreq : req.body.lowFreq,
            lowGain : req.body.lowGain,

            lowMidBand : req.body.lowMidBand,
            lowMidHiLowQ : req.body.lowMidHiLowQ,
            lowMidFreq : req.body.lowMidFreq,
            lowMiGain : req.body.lowMiGain,

            hiMidBand : req.body.hiMidBand,
            hiMidFreq : req.body.hiMidFreq,
            hiMidGain : req.body.hiMidGain,
            hiBand : req.body.hiBand,
            hiPeak : req.body.hiPeak,
            hiFreq : req.body.hiFreq,
            hiGain : req.body.hiGain 
        });

        //call save
        rockMale.save((err)=>{
            //error handle. and return
            if(err){
                return res.status(422).send('Error Saving record'); 
            }
            //upate the user document with the rockMale._id
            user.rockMale = rockMale._id;
            //call save on the user document.
            user.save((err) =>{
                //handle error and return
                if(err){
                    return res.status(422).send('Error Saving record'); 
                }
                //return the rockMale document.
                res.json(rockMale);
            });
        })
    }
}