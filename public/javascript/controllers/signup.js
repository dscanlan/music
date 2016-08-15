(function(){
    'use strict';
    angular.module('musicApp')
    .controller('signUpCtrl', function(musicFactory, musicService, $state){
        //using controllerAs to stop shadowing.
        var self = this;

        //error string
        self.err = '';

        //button clicked
        self.register = function(){
            //reset the error string.
            self.err = '';

            //check the passwors match
            if(self.password !== self.confirmpassword){
                return self.err = 'Password Do Not Match';
            }

            //got to service and attempt to signup
            musicFactory.signup({email: self.username, password: self.password})
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