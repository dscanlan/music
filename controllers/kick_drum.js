const KickDrum = require('../models/kick_drum'),
User = require('../models/users');

module.exports = {
    
    //Kick Drum
    getKickDrum: (req, res) => {
        const _id = req.params.id;
        if(!_id){
            return res.status(422).send('ID Not found');
        }
        KickDrum.findOne({_id}, (err, kickDrum) =>{
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            if(!kickDrum){
                return res.status(422).send('Error finding record'); 
            }

            res.json(kickDrum);
        });
    },
    updateKickDrum: (req, res) => {
        const _id = req.params.id;
        if(!_id){
            return res.status(422).send('ID Not found');
        }
        KickDrum.findOne({_id}, (err, kickDrum) =>{
            if(err){
                return res.status(422).send('Error finding record'); 
            }
            if(!kickDrum){
                return res.status(422).send('Error finding record'); 
            }

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

            kickDrum.save((err)=>{
                if(err){
                    return res.status(422).send('Error updating record'); 
                }
                res.json(kickDrum);
            })

            
        });
    },
    deleteKickDrum: (req, res) => {
        const user = req.user;
        const _id = req.params.id;
        if(!_id){
            return res.status(422).send('ID Not found');
        }

        KickDrum.deleteOne({_id: _id}, (err, result) => {
            if(err){
                res.status(500).send('Error removing Preset');
            }
            user.kickDrum = null
            user.save((err)=>{
                if(err){

                }
            });
            res.status(200).send('Preset Removed Successfuly');
        });
    },
    addKickDrum: (req, res) => {
        const user = req.user;
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

        kickDrum.save((err)=>{
            if(err){
                return res.status(422).send('Error Saving record'); 
            }
            user.kickDrum = kickDrum._id;
            user.save((err) =>{
                if(err){
                    return res.status(422).send('Error Saving record'); 
                }
                res.json(kickDrum);
            })
        })
    }
}