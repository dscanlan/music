(function(){
    'use strict';
    angular.module('musicApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        
        $stateProvider
        .state('/', {
            url:'/',
            templateUrl: '../views/main.html',
            controller: 'mainCtrl',
            controllerAs: 'vm'
        })
        .state('/login', {
            url:'/login',
            templateUrl: '../views/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })
        .state('/signup', {
            url:'/signup',
            templateUrl: '../views/signup.html',
            controller: 'signUpCtrl',
            controllerAs: 'vm'
        })
        .state('/kickdrum', {
            url:'/kickdrum',
            templateUrl: '../views/kick_drum.html',
            controller: 'kickDrumCtrl',
            controllerAs: 'vm'
        })
        .state('/kickdrum.detail', {
            url:'/kickdrum/:id',
            templateUrl: '../views/kick_drum.html',
            controller: 'kickDrumCtrl',
            controllerAs: 'vm'
        })
        .state('/rockmale', {
            url:'/rockmale',
            templateUrl: '../views/rock_male.html',
            controller: 'rockMaleCtrl',
            controllerAs: 'vm'
        })
        .state('/rockmale.detail', {
            url:'/rockmale/{id}',
            templateUrl: '../views/rock_male.html',
            controller: 'rockMaleCtrl',
            controllerAs: 'vm'
        })
        .state('/vocalcompressor', {
            url:'/vocalcompressor',
            templateUrl: '../views/vocal_compressor.html',
            controller: 'vocalCompressorCtrl',
            controllerAs: 'vm'
        })
        .state('/vocalcompressor.detail', {
            url:'/vocalcompressor/{id}',
            templateUrl: '../views/vocal_compressor.html',
            controller: 'vocalCompressorCtrl',
            controllerAs: 'vm'
        });
    }]);
}());