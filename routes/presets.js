//API ROUTES.


const authentication = require('../controllers/authentication'),
passportService = require('../services/passport'),
passport = require('passport'),
presets = require('../controllers/presets'),
kickDrum = require('../controllers/kick_drum'),
rockMale = require('../controllers/rock_male'),
vocalCompressor = require('../controllers/vocal_compressor');

//requireAuth middleware to check that the API is receiving a valid token.
const requireAuth = passport.authenticate('jwt', {session: false});

//requireSignIn is used for login screen
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function(app){
    //routes using middleware for authentication.
    app.post('/signup', authentication.signUp);
    app.post('/signin', requireSignIn ,authentication.signIn);

    app.get('/api/presets', requireAuth, presets.getPresets);

    app.get('/api/rockMale/:id', requireAuth, rockMale.getRockMale);
    app.put('/api/rockMale/:id', requireAuth, rockMale.updateRockMale);
    app.delete('/api/rockMale/:id', requireAuth, rockMale.deleteRockMale);
    app.post('/api/rockMale', requireAuth, rockMale.addRockMale);

    app.get('/api/kickDrum/:id', requireAuth, kickDrum.getKickDrum);
    app.put('/api/kickDrum/:id', requireAuth, kickDrum.updateKickDrum);
    app.delete('/api/kickDrum/:id', requireAuth, kickDrum.deleteKickDrum);
    app.post('/api/kickDrum', requireAuth, kickDrum.addKickDrum);

    app.get('/api/vocalCompressor/:id', requireAuth, vocalCompressor.getVocalCompressor);
    app.put('/api/vocalCompressor/:id', requireAuth, vocalCompressor.updateVocalCompressor);
    app.delete('/api/vocalCompressor/:id', requireAuth, vocalCompressor.deleteVocalCompressor);
    app.post('/api/vocalCompressor', requireAuth, vocalCompressor.addVocalCompressor);
}