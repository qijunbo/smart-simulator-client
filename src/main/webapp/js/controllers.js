'use strict';

/* Controllers */

var deviceControllers = angular.module('deviceControllers', []);

deviceControllers.controller('deviceInitController', [ '$scope',   'chargePointService', 'chargePointIdService',
		function deviceInitController($scope, chargePointService, chargePointIdService) {
			// when user click the new button, try to input the charge point
			// information
			$scope.onNewButtonClick = function() {
				$scope.chargepoint = {
					"version" : "OCPP15",
					"centralURL" : "http://op.spie.ievep.net/ws/OcppGateway",
					"connectors" : [ {
						"id" : 0,
						"status" : "Available"
					} ]
				};
			};

			// when user click the edit button, going to edit, but not yet save.
			$scope.onEditClick = function(item) {
				$scope.chargepoint = item;
			};

			// when user click the save button, save data.
			$scope.saveUpdate = function( ) {
				// alert( JSON.stringify($scope.chargepoint) );
				// console.log( JSON.stringify($scope.chargepoint) );
				var insertFlag = $scope.chargepoint.id == null ? true : false;

				chargePointService.save({}, $scope.chargepoint, function success(response) {
					console.log("save ChargePoint Success:" + JSON.stringify(response));
					if (insertFlag) {
						$scope.cps.push(response);
					}

				}, function error(errorResponse) {
					alert("Connot connect to server.");
					console.log("Error:" + JSON.stringify(errorResponse));
				});
			};
			 
			$scope.remove = function( item ) {
				// alert( JSON.stringify(item) );
				// console.log( JSON.stringify(item) );
 
				chargePointIdService.delete({id:item.id}, {}, function success(response) {
					console.log("remove ChargePoint Success:" + JSON.stringify(item));
			 		var index = $scope.cps.indexOf(item);
				    $scope.cps.splice(index, 1); 

				}, function error(errorResponse) {
					alert("Connot connect to server.");
					console.log("Error:" + JSON.stringify(errorResponse));
				});
			};
			

		} ]);

deviceControllers.controller('listChargePointController', [ '$scope', 'chargePointService', 
		function listChargePointController($scope, chargePointService) {
			$scope.cps = [];
			chargePointService.get({}, function success(response) {
				
				// console.log("listChargePoint Success:" +
				// JSON.stringify(response));
				$scope.cps = response;

			}, function error(errorResponse) {
				alert("Connot connect to server.");
				console.log("Error:" + JSON.stringify(errorResponse));
			});

		} ]);


// this will be removed
deviceControllers.controller('saveChargePointController', [ '$scope', 'chargePointService',   
		function saveChargePointController($scope, chargePointService) { 
			var chargepoint = {
					"version" : "OCPP15",
					"serial": "test",
					"centralURL" : "http://willow:7080/ocppservice/",
					"connectors" : [ {
						"id" : 0,
						"status" : "Available"
					} ]
			};
			chargePointService.save({}, chargepoint, function success(response) {
				
				console.log("saveChargePoint Success:" + JSON.stringify(response));
				$scope.cps = response;

			}, function error(errorResponse) {
				alert("error");
				console.log("Error:" + JSON.stringify(errorResponse));
			});

		} ]);

// //this will be removed
deviceControllers.controller('getChargePointController', [ '$scope', '$routeParams', 'chargePointIdService',
		function getChargePointController($scope, $routeParams, chargePointIdService) {
			var deviceId = $routeParams.id;
			$scope.chargepoint = {};
			alert("getChargePoint");
			chargePointIdService.get({
				id : deviceId
			}, function success(response) {

				console.log("getChargePoint Success:" + JSON.stringify(response));
				$scope.chargepoint = response;

			}, function error(errorResponse) {
				console.log("Error:" + JSON.stringify(errorResponse));
			});

		} ]);


deviceControllers.controller('timeController', [ '$scope',  '$timeout',
		function timeController($scope, $timeout) {
			var updateClock = function() {
				$scope.clock = new Date();
				$timeout(function() {
					updateClock();
				}, 2000);
			};
			updateClock();

		} ]);