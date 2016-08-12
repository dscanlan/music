const authentication = require('../controllers/authentication'),
passportService = require('../services/passport'),
passport = require('passport'),
presets = require('../controllers/presets'),
kickDrum = require('../controllers/kick_drum'),
rockMale = require('../controllers/rock_male'),
vocalCompressor = require('../controllers/vocal_compressor');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function(app){
    app.post('/signup', authentication.signUp);
    app.post('/signin', requireSignIn ,authentication.signIn);

    app.get('/presets', requireAuth, presets.getPresets);

    app.get('/rockMale/:id', requireAuth, rockMale.getRockMale);
    app.put('/rockMale/:id', requireAuth, rockMale.updateRockMale);
    app.delete('/rockMale/:id', requireAuth, rockMale.deleteRockMale);
    app.post('/rockMale', requireAuth, rockMale.addRockMale);

    app.get('/kickDrum/:id', requireAuth, kickDrum.getKickDrum);
    app.put('/kickDrum/:id', requireAuth, kickDrum.updateKickDrum);
    app.delete('/kickDrum/:id', requireAuth, kickDrum.deleteKickDrum);
    app.post('/kickDrum', requireAuth, kickDrum.addKickDrum);

    app.get('/vocalCompressor/:id', requireAuth, vocalCompressor.getVocalCompressor);
    app.put('/vocalCompressor/:id', requireAuth, vocalCompressor.updateVocalCompressor);
    app.delete('/vocalCompressor/:id', requireAuth, vocalCompressor.deleteVocalCompressor);
    app.post('/vocalCompressor', requireAuth, vocalCompressor.addVocalCompressor);
}