'use strict';

/* Controllers */

var auditControllers = angular.module('auditControllers', []);

auditControllers.controller('auditController', [ '$scope',  '$routeParams', 'auditService', 
		function listChargePointController($scope, $routeParams, auditService) {
			$scope.audits = [];
			alert("logs");
			auditService.get({deviceSerial: $routeParams.deviceSerial }, {}, function success(response) {
				// console.log("listChargePoint Success:" + JSON.stringify(response));
				$scope.audits = response;

			}, function error(errorResponse) {
				alert("Connot connect to server.");
				console.log("Error:" + JSON.stringify(errorResponse));
			});

		} ]);