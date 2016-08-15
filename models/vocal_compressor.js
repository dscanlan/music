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