'use strict';

/* App Module */

var deviceApp = angular.module('deviceApp', [
    'ngRoute',     
    'deviceControllers' ,
    'auditControllers',
    'deviceServices',
    'auditServices'
]);


deviceApp.config(['$routeProvider', '$locationProvider',   
    function($routeProvider, $locationProvider) {

        $routeProvider.
        		when('/', {
                    templateUrl: 'partials/devices.html',
                    controller: 'listChargePointController'
                }).when('/logs', {
                    templateUrl: 'partials/sysaudit.html',  
                    controller: 'sysauditController'
                }).when('/logs/:serial', {
                    templateUrl: 'partials/audit.html',  
                    controller: 'auditController'
                }).otherwise({
                    redirectTo: '/'
                });

        $locationProvider.html5Mode(false).hashPrefix('!');
    } ]);

 
