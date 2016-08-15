//controller to get preset ids from user document.

module.exports = {
    getPresets:  (req, res) => {
        //use the user document from req.
        const presets = {
            kickDrum: req.user.kickDrum,
            rockMale: req.user.rockMale,
            vocalCompressor: req.user.vocalCompressor
        }

        //send the object.
        res.json(presets);
    }
}