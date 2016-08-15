angular.module('musicApp')
.controller('mainCtrl', function(musicFactory, $state, musicService){
    //using controllerAs to stop shadowing.
    var self = this;

    //error string
    self.err = '';

    //function to be used through out. get the logged in users presets form the server
    var getPresets = function(){
        musicFactory.getpresets()
        .then(function(success){
            //set the presets to a local var.
            self.presets = success.data;
        }, function(err){
            //show the error
            self.err = err;
        });
    }

    //call the function
    getPresets();

    //logout to clear the token form local storage.
    self.logout = function(){
        musicService.clearToken();
        $state.go('/login');
    }

    //got to the vocal compressor edit/create page.
    self.linkVocal = function(){
        //check that we do not have a vocalcompressor in the preset objet
        if(self.presets.vocalCompressor === null){
            $state.go('/vocalcompressor');
        }
        else{
            //we do not so create.
            $state.go('/vocalcompressor.detail', {id: self.presets.vocalCompressor});
        }
    }

    //got to the kick drum edit/create page.
    self.linkKick = function(){
        //check that we do not have a kickDrum in the preset objet
        if(self.presets.kickDrum === null){
            $state.go('/kickdrum');
        }
        else{
            //we do not so create.
            $state.go('/kickdrum.detail',{ id: self.presets.kickDrum});
        }
    }

    //got to the rock male edit/create page.
    self.linkRock = function(){
        //check that we do not have a rockMale in the preset objet
        if(self.presets.rockMale === null){
            $state.go('/rockmale');
        }
        else{
            //we do not so create.
            $state.go('/rockmale.detail', {id: self.presets.rockMale});
        }
    }

    //delete the vocal
    self.deleteVocal = function(){
        musicFactory.deleteVocalCompressor(self.presets.vocalCompressor)
        .then(function(success){    
            //get the presets again to keep insync with server
            getPresets();
        }, function(err){
            self.err = err;
        });
    }

    //delete the kick drum
    self.deleteKick = function(){
        musicFactory.deleteKickDrum(self.presets.kickDrum)
        .then(function(success){    
            //get the presets again to keep insync with server
            getPresets();
        }, function(err){
            self.err = err;
        });
    }

    //delete the rock male
    self.deleteRock = function(){
        musicFactory.deleteRockMale(self.presets.rockMale)
        .then(function(success){   
            //get the presets again to keep insync with server 
            getPresets();
        }, function(err){
            self.err = err;
        });
    }
});