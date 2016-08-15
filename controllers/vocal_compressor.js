//require volca compressor model
const VocalCompressor = require('../models/vocal_compressor'),
//require the user model
User = require('../models/users');

//as routes are using middleware they will receieve the authenticated user document in REQ.

module.exports = {
    //get individual document.
    getVocalCompressor: (req, res) => {
        //read id from the params.
        const _id = req.params.id;
        //check that we do have one.
        if(!_id){
            //return error if not.
            return res.status(422).send('ID Not found');
        }
        //check that its a valid _id
        VocalCompressor.findOne({_id}, (err, vocalCompressor) =>{
            //error handle something wrong reading from DB
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            //_id does not exist. return error.
            if(!vocalCompressor){
                return res.status(422).send('Error finding record'); 
            }
            //return the document.
            res.json(vocalCompressor);
        });
    },
    //update document
    updateVocalCompressor: (req, res) => {
        //read id from the params.
        const _id = req.params.id;
        //check that we do have one.
        if(!_id){
            //return error if not.
            return res.status(422).send('ID Not found');
        }
        //check that its a valid _id
        VocalCompressor.findOne({_id}, (err, vocalCompressor) =>{
            //error handle something wrong reading from DB
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            //_id does not exist. return error.
            if(!rockMale){
                return res.status(422).send('Error finding record'); 
            }

            //we have a document. Update the properties with props in body,
            vocalCompressor.mode= req.body.mode;
            vocalCompressor.attack= req.body.attack;
            vocalCompressor.release= req.body.release;
            vocalCompressor.threshold= req.body.threshold;
            vocalCompressor.ratio= req.body.ratio;
            vocalCompressor.presense= req.body.presense;
            vocalCompressor.makeUp= req.body.makeUp;

            //call save 
            vocalCompressor.save((err) =>{
                //error handling. 
                if(err){
                    return res.status(422).send('Error updating record'); 
                }
                //return the document.
                res.json(vocalCompressor);
            });
        });
    },
    //delete document
    deleteVocalCompressor: (req, res) => {
        //get values from req.
        const _id = req.params.id;
        const user = req.user;
        //check that we have a valid _id
        if(!_id){
            //return error if not.
            return res.status(422).send('ID Not found');
        }

        //call remove from the model with the _id
        VocalCompressor.remove({_id: _id}, (err, result) => {
            //handle error and return
            if(err){
                return res.status(500).send('Error removing Preset');
            }
            //update the user document that vocalCompressor is now null.
            user.vocalCompressor = null

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
    addVocalCompressor: (req, res) => {
        //get the user from req.
        const user = req.user;
        //create new VocalCompressor.
        const vocalCompressor = new VocalCompressor({
            mode: req.body.mode,
            attack: req.body.attack,
            release: req.body.release,
            threshold: req.body.threshold,
            ratio: req.body.ratio,
            presense: req.body.presense,
            makeUp: req.body.makeUp
        });

        //call save
        vocalCompressor.save((err) => {
            //error handle. and return
            if(err){
                return res.status(422).send('Error Saving Preset');
            }
            //upate the user document with the vocalCompressor._id
            user.vocalCompressor = vocalCompressor._id;
            //call save on the user document.
            user.save((err) =>{
                //handle error and return
                if(err){
                    return res.status(422).send('Error Saving record'); 
                }
                //return the vocalCompressor document.
                res.json(vocalCompressor);
            })
        })
    }
}