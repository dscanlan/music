const VocalCompressor = require('../models/vocal_compressor'),
User = require('../models/users');

module.exports = {
    
    //Vocal Compressor
    getVocalCompressor: (req, res) => {
        const _id = req.params.id;
        if(!_id){
            return res.status(422).send('ID Not found');
        }
        VocalCompressor.findOne({_id}, (err, vocalCompressor) =>{
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            if(!vocalCompressor){
                return res.status(422).send('Error finding record'); 
            }

            res.json(vocalCompressor);
        });
    },
    updateVocalCompressor: (req, res) => {
        const _id = req.params.id;
        if(!_id){
            return res.status(422).send('ID Not found');
        }
        VocalCompressor.findOne({_id}, (err, vocalCompressor) =>{
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            if(!rockMale){
                return res.status(422).send('Error finding record'); 
            }

            vocalCompressor.mode= req.body.mode;
            vocalCompressor.attack= req.body.attack;
            vocalCompressor.release= req.body.release;
            vocalCompressor.threshold= req.body.threshold;
            vocalCompressor.ratio= req.body.ratio;
            vocalCompressor.presense= req.body.presense;
            vocalCompressor.makeUp= req.body.makeUp;

            vocalCompressor.save((err) =>{
                if(err){
                    return res.status(422).send('Error updating record'); 
                }
                res.json(vocalCompressor);
            });

            
        });
    },
    deleteVocalCompressor: (req, res) => {
        const _id = req.params.id;
        const user = req.user;
        if(!_id){
            return res.status(422).send('ID Not found');
        }

        VocalCompressor.deleteOne({_id: _id}, (err, result) => {
            if(err){
                res.status(500).send('Error removing Preset');
            }
            user.vocalCompressor = null
            user.save((err)=>{
                if(err){

                }
            });
            res.status(200).send('Preset Removed Successfuly');
        });
    },
    addVocalCompressor: (req, res) => {
        const user = req.user;
        const vocalCompressor = new VocalCompressor({
            mode: req.body.mode,
            attack: req.body.attack,
            release: req.body.release,
            threshold: req.body.threshold,
            ratio: req.body.ratio,
            presense: req.body.presense,
            makeUp: req.body.makeUp
        });

        vocalCompressor.save((err) => {
            if(err){
                return res.status(422).send('Error Saving Preset');
            }
            user.vocalCompressor = vocalCompressor._id;
            user.save((err) =>{
                if(err){
                    return res.status(422).send('Error Saving record'); 
                }
                res.json(vocalCompressor);
            })
        })
    }
}