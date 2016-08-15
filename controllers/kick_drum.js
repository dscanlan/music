//api controller for kick drum.

const KickDrum = require('../models/kick_drum'), //require the Kick Drum Model
User = require('../models/users'); // require User model

//as routes are using middleware they will receieve the authenticated user document in REQ.

module.exports = {
    //get individual document.
    getKickDrum: (req, res) => {
        //read id from the params.
        const _id = req.params.id;
        //check that we do have one.
        if(!_id){
            //retrun error if not.
            return res.status(422).send('ID Not found');
        }
        //check that its a valid _id
        KickDrum.findOne({_id}, (err, kickDrum) =>{
            //error handle something wrong reading from DB
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            //_id does not exist. return error.
            if(!kickDrum){
                return res.status(422).send('Error finding record'); 
            }
            //return the document.
            res.json(kickDrum);
        });
    },
    //update document
    updateKickDrum: (req, res) => {
        //read id from the params.
        const _id = req.params.id;
        //check that we do have one.
        if(!_id){
            //return error if not.
            return res.status(422).send('ID Not found');
        }
        //check that its a valid _id
        KickDrum.findOne({_id}, (err, kickDrum) =>{
            //error handle something wrong reading from DB
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            //_id does not exist. return error.
            if(!kickDrum){
                return res.status(422).send('Error finding record'); 
            }

            //we have a document. Update the properties with props in body,
            kickDrum.lowBand = req.body.lowBand;
            kickDrum.lowPeak = req.body.lowPeak;
            kickDrum.lowFreq = req.body.lowFreq;
            kickDrum.lowGain = req.body.lowGain;

            kickDrum.lowMidBand = req.body.lowMidBand;
            kickDrum.lowMidHiLowQ = req.body.lowMidHiLowQ;
            kickDrum.lowMidFreq = req.body.lowMidFreq;
            kickDrum.lowMiGain = req.body.lowMiGain;

            kickDrum.hiMidBand = req.body.hiMidBand;
            kickDrum.hiMidFreq = req.body.hiMidFreq;
            kickDrum.hiMidGain = req.body.hiMidGain;

            kickDrum.hiBand = req.body.hiBand;
            kickDrum.hiPeak = req.body.hiPeak;
            kickDrum.hiFreq = req.body.hiFreq;
            kickDrum.hiGain = req.body.hiGain; 

            //call save from the kickDrum.
            kickDrum.save((err)=>{
                //error handling. 
                if(err){
                    return res.status(422).send('Error updating record'); 
                }

                //return the document.
                res.json(kickDrum);
            })

            
        });
    },
    //delete document
    deleteKickDrum: (req, res) => {
        //get values from req.
        const user = req.user;
        const _id = req.params.id;
        //check that we have a valid _id
        if(!_id){
            //return error if not.
            return res.status(422).send('ID Not found');
        }

        //call remove from the model with the _id
        KickDrum.remove({_id: _id}, (err, result) => {
            //handle error and return
            if(err){
                return res.status(500).send('Error removing Preset');
            }
            //update the user document that kickDrum is now null.
            user.kickDrum = null

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
    addKickDrum: (req, res) => {
        //get the user from req.
        const user = req.user;
        //create new kick drum.
        const kickDrum = new KickDrum({
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

        //call save on the kickdrum.
        kickDrum.save((err)=>{
            //error handle. and return
            if(err){
                return res.status(422).send('Error Saving record'); 
            }
            //upate the user document with the kickDrum._id
            user.kickDrum = kickDrum._id;
            //call save on the user document.
            user.save((err) =>{
                //handle error and return
                if(err){
                    return res.status(422).send('Error Saving record'); 
                }

                //return the kickdrum document.
                res.json(kickDrum);
            })
        })
    }
}