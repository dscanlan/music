const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const kickDrum = new Schema({
    lowBand: Boolean,
    lowPeak: String,
    lowFreq: Number,
    lowGain: Number,

    lowMidBand: Boolean,
    lowMidHiLowQ: String,
    lowMidFreq: Number,
    lowMiGain: Number,

    hiMidBand: Boolean,
    hiMidFreq: Number,
    hiMidGain: Number,

    hiBand: Boolean,
    hiPeak: String,
    hiFreq: Number,
    hiGain: Number
});

const KickDrum = mongoose.model('kickDrum', kickDrum);

module.exports = KickDrum;