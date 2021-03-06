(function(){
    'use strict';
    angular.module('musicApp')
    .controller('vocalCompressorCtrl', function(musicFactory, $state, $stateParams){
        //using controllerAs to stop shadowning.
        var self = this;

        //error string put the screen.
        self.err = '';

        //check that we have an ID in the state params. If so then we're updating'
        if($state.params.id !== undefined){
            //call the service to get the document 
            musicFactory.getVocalCompressor($state.params.id)
            .then(function(success){//promise success
                //set our document as preset object in scope
                self.preset = success.data;
            }, function(err){//promise error
                self.err = err;
            });
        }


        self.submit = function(){
            //reset the err string
            self.err = '';

            //check that we have a param.
            if($state.params.id !== undefined){
                //we have param therefore call put with id and object
                musicFactory.putVocalCompressor($state.params.id, self.preset)
                .then(function(success){//promise success
                    $state.go('/');//success go back to main page.
                }, function(err){//promise error
                    self.err = err;
                });
            }
            else{
                //no parm so call post with just object
                musicFactory.postVocalCompressor(self.preset)
                .then(function(success){//promise success
                    $state.go('/'); //success go back to main page.
                }, function(err){ //promise error
                    self.err = err;
                });
            }
        }

        //cancel button goes back to main.
        self.cancel = function(){
            $state.go('/');
        }
    });
}());