'use strict';

/* Services */

//var appContext = "http://5.10.70.180:88"
var appContext = "http://localhost:8080"

var deviceServices = angular.module('deviceServices', ['ngResource']);

deviceServices.factory('chargePointIdService', ['$resource',
    function($resource) {
		
        return $resource(appContext + "/chargepoint/:id", {}, {
            get: {method: 'GET', cache: false, isArray: false},
            delete: {method: 'DELETE', cache: false, isArray: false}
        });
    }]);

 
deviceServices.factory('chargePointService', ['$resource',
  function($resource) {
	 
	  return $resource( appContext + "/chargepoint", {}, {
		  get: {method: 'GET', cache: false, isArray: true} ,
		  save: {method: 'POST', cache: false, isArray: false},
		  update: {method: 'PUT', cache: false, isArray: false}
					 
	  });
  }]);


var auditServices = angular.module('auditServices', ['ngResource']);

auditServices.factory('auditService', ['$resource', 
 	function($resource) {
        return $resource(appContext + "/audit/device/:deviceSerial", {}, {
            get: {method: 'GET', cache: false, isArray: true}
        });
    }]);

auditmoreServices.factory('auditmoreService', ['$resource', 
	function($resource) {
    	return $resource(appContext + "/audit/device/:deviceSerial/time/:date", {}, {
        	get: {method: 'GET', cache: false, isArray: true}
    	});
	}]);