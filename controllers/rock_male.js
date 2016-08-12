const RockMale = require('../models/rock_male'),
User = require('../models/users');

module.exports = {
    //Rock Male
    getRockMale: (req, res) => {
        const _id = req.params.id;
        if(!_id){
            return res.status(422).send('ID Not found');
        }
        RockMale.findOne({_id}, (err, rockMale) =>{
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            if(!rockMale){
                return res.status(422).send('Error finding record'); 
            }

            res.json(rockMale);
        });
    },
    updateRockMale:(req, res) => {
        const _id = req.params.id;
        if(!_id){
            return res.status(422).send('ID Not found');
        }
        RockMale.findOne({_id}, (err, rockMale) =>{
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            if(!rockMale){
                return res.status(422).send('Error finding record'); 
            }

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

            rockMale.save((err)=>{
                if(err){
                    return res.status(422).send('Error updating record'); 
                }
                res.json(rockMale);
            })

            
        });
    },
    deleteRockMale: (req, res) => {
        const user = req.user;
        const _id = req.params.id;
        if(!_id){
            return res.status(422).send('ID Not found');
        }

        RockMale.remove({_id: _id}, (err, result) => {
            if(err){
                res.status(500).send('Error removing Preset');
            }

            user.rockMale = null
            user.save((err)=>{
                if(err){

                }
            });

            res.status(200).send('Preset Removed Successfuly');
        });
    },
    addRockMale: (req, res) => {
        const user = req.user;
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

        rockMale.save((err)=>{
            if(err){
                return res.status(422).send('Error Saving record'); 
            }
            user.rockMale = rockMale._id;
            
            user.save((err) =>{
                if(err){
                    return res.status(422).send('Error Saving record'); 
                }
                res.json(rockMale);
            });
        })
    }
}