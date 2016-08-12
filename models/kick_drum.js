const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const kickDrum = new Schema({
    lowBand: Boolean,
    lowPeak: String,
    lowFreq: Number,
    lowGain: String,

    lowMidBand: Boolean,
    lowMidHiLowQ: String,
    lowMidFreq: Number,
    lowMiGain: Number,

    hiMidBand: String,
    hiMidFreq: Number,
    hiMidGain: Number,
    hiBand: Boolean,
    hiPeak: String,
    hiFreq: Number,
    hiGain: Number
});

const KickDrum = mongoose.model('kickDrum', kickDrum);

module.exports = KickDrum;

// {
// Low band = On
// Low peak/shelf = peak 
// Low freq (Hz) = 155 
// Low gain = +2
// Low/Mid band = On 
// Low/Mid Hi/Low Q = Hi 
// Low/Mid freq (Hz) = 290 
// Low/mid gain = -6
// Hi/Mid band = On 
// Hi/Mid freq (kHz) = 2.4 
// Hi/Mid gain = -2
// Hi band = On
// Hi peak/shelf = shelf 
// Hi freq (kHz) = 7.2
// Hi gain = +4
// }