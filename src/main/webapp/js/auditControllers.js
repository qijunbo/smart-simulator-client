'use strict';

/* Controllers */

var auditControllers = angular.module('auditControllers', []);

auditControllers.controller('auditController', [ '$scope',  '$routeParams', 'auditService', 'chargePointSerialService',
		function listChargePointController($scope, $routeParams, auditService, chargePointSerialService) {
	
			$scope.audits = [];
			 
			console.log($routeParams.serial);
			chargePointSerialService.get({serial: $routeParams.serial }, {}, function success(response) {
				console.log("get ChargePoint Success:" + JSON.stringify(response));
				$scope.chargepoint = response;

			}, function error(errorResponse) {
				alert("Connot connect to server.");
				console.log("Error:" + JSON.stringify(errorResponse));
			});

			console.log($routeParams.serial);

			auditService.get({serial: $routeParams.serial }, {}, function success(response) {
				console.log("list audit Success:" + JSON.stringify(response));
				$scope.audits = response;

			}, function error(errorResponse) {
				alert("Connot connect to server.");
				console.log("Error:" + JSON.stringify(errorResponse));
			});


		} ]);