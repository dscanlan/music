(function(){
    'use strict';
    angular.module('musicApp')
    .controller('loginCtrl', function(musicFactory, musicService){
        //using controllerAs to stop shadowning.
        var self = this;

        //error string
        self.err = '';

        //button clicked
        self.login = function(){
            //reset the error string.
            self.err = '';
            //got to service and attempt to login
            musicFactory.login({email: self.username, password: self.password})
            .then(function(success){//promise success
                //local service to store the token returned form service
                musicService.saveToken(success.data.token);
                $state.go('/');
            }, function(error){//promise error
                self.err = error;
            });
        }

    });
}());