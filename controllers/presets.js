const KickDrum = require('../models/kick_drum'),
RockMale = require('../models/rock_male'),
VocalCompressor = require('../models/vocal_compressor'),
User = require('../models/users');

module.exports = {
    getPresets:  (req, res) => {
        const presets = {
            kickDrum: req.user.kickDrum,
            rockMale: req.user.rockMale,
            vocalCompressor: req.user.vocalCompressor
        }
        res.json(presets);
    }
}