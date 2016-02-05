'use strict';

/* App Module */

var deviceApp = angular.module('deviceApp', [
    'ngRoute',     
    'deviceControllers' ,
    'deviceServices',
    'auditServices'
]);


deviceApp.config(['$routeProvider', '$locationProvider',   
    function($routeProvider, $locationProvider) {

        $routeProvider.
                when('/:id', {
                    templateUrl:'partials/edit.html', // this will be removed,
                    controller: 'getChargePointController'
                }).when('/', {
                    templateUrl: 'partials/devices.html',
                    controller: 'listChargePointController'
                }).when('/logs', {
                    templateUrl: 'partials/audit.html',  
                    controller: 'auditController'
                });

        $locationProvider.html5Mode(false).hashPrefix('!');
    } ]);

 
