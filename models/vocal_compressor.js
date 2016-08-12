const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const vocalCompressor = new Schema({
    mode: String,
    attack: Number,
    release: Number,
    threshold: Number,
    ratio: String,
    presense: Number,
    makeUp: Number
});

const VocalCompressor = mongoose.model('vocalCompressor', vocalCompressor);

module.exports = VocalCompressor;


// {
// Mode = creative 
// Attack (ms) = 20 
// Release (ms) = 10 
// Threshold (dB) = -10 
// Ratio = 7:1
// Presence (dB) = -7 
// Make up (dB) = 8
// }