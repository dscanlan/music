(function(){
    'use strict';
    angular.module('musicApp')
    .factory('musicFactory', function($http, musicService){
        return {
            login: function(postData){
                return $http.post('http://localhost:3000/signin', postData , { headers: {authorization: musicService.getToken()}});
            },
            signup: function(postData){
                return $http.post('http://localhost:3000/signup', postData , { headers: {authorization: musicService.getToken()}});
            },
            getpresets: function(){
                return $http.get('http://localhost:3000/api/presets', { headers: {authorization: musicService.getToken()}});
            },
            //kick drum
            getKickDrum: function(id){
                return $http.get('http://localhost:3000/api/kickDrum/'+id ,{ headers: {authorization: musicService.getToken()}});
            },
            putKickDrum: function(id, postData){
                return $http.put('http://localhost:3000/api/kickDrum/'+id , postData ,{ headers: {authorization: musicService.getToken()}});
            },
            deleteKickDrum: function(id){
                return $http.delete('http://localhost:3000/api/kickDrum/'+id  ,{ headers: {authorization: musicService.getToken()}});
            },
            postKickDrum: function( postData){
                return $http.post('http://localhost:3000/api/kickDrum', postData ,{ headers: {authorization: musicService.getToken()}});
            },
            //rock male
            
            getRockMale: function(id){
                return $http.get('http://localhost:3000/api/rockMale/'+id ,{ headers: {authorization: musicService.getToken()}});
            },
            putRockMale: function(id, postData){
                return $http.put('http://localhost:3000/api/rockMale/'+id, postData ,{ headers: {authorization: musicService.getToken()}});
            },
            deleteRockMale: function(id){
                return $http.delete('http://localhost:3000/api/rockMale/'+id ,{ headers: {authorization: musicService.getToken()}});
            },
            postRockMale: function( postData){
                return $http.post('http://localhost:3000/api/rockMale', postData ,{ headers: {authorization: musicService.getToken()}});
            },

            //vocal compressor
            getVocalCompressor: function(id){
                return $http.get('http://localhost:3000/api/vocalCompressor/'+id ,{ headers: {authorization: musicService.getToken()}});
            },
            putVocalCompressor: function(id, postData){
                return $http.put('http://localhost:3000/api/vocalCompressor/'+id, postData ,{ headers: {authorization: musicService.getToken()}});
            },
            deleteVocalCompressor: function(id){
                return $http.delete('http://localhost:3000/api/vocalCompressor/'+id ,{ headers: {authorization: musicService.getToken()}});
            },
            postVocalCompressor: function( postData){
                return $http.post('http://localhost:3000/api/vocalCompressor', postData ,{ headers: {authorization: musicService.getToken()}});
            }
        }
    })
    .service('musicService', function($window){
        return{
            checkToken: function(){
                if($window.localStorage.getItem( 'token' ) === undefined){
                    return false;
                }
                return true;
            },
            saveToken: function(token){
                $window.localStorage.setItem( 'token', token );
            },
            clearToken: function(){
                $window.localStorage.clear();
            },
            getToken: function(){
                return $window.localStorage.getItem( 'token' );
            }
        }
    });
}());