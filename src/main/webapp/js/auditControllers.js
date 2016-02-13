'use strict';

/* Controllers */

var auditControllers = angular.module('auditControllers', []);

auditControllers.controller('auditController', [ '$scope',  '$routeParams', 'auditService', 'chargePointSerialService',
		function auditController($scope, $routeParams, auditService, chargePointSerialService) {
	
			$scope.audits = [];
			$scope.deviceSerial = $routeParams.serial;
			console.log($routeParams.serial);
			chargePointSerialService.get({serial: $routeParams.serial }, {}, function success(response) {
				//console.log("get ChargePoint Success:" + JSON.stringify(response));
				$scope.chargepoint = response;

			}, function error(errorResponse) {
				alert("Connot connect to server.");
				console.log("Error:" + JSON.stringify(errorResponse));
			});

			auditService.get({serial: $routeParams.serial }, {}, function success(response) {
				//console.log("list audit Success:" + JSON.stringify(response));
				$scope.audits = response;

			}, function error(errorResponse) {
				alert("Connot connect to server.");
				console.log("Error:" + JSON.stringify(errorResponse));
			});

			$scope.deleteLogs = function(){
				//alert($routeParams.serial);
				auditService.delete({serial: $routeParams.serial }, {}, function success(response) {
					console.log($scope.audits);
					console.log("array left:" + JSON.stringify($scope.audits));
					$scope.audits = [];
					console.log($scope.audits);
					console.log("array left:" + JSON.stringify($scope.audits));
					console.log("remove log Success:" + JSON.stringify(response));
					
				}, function error(errorResponse) {
					alert("Connot connect to server.");
					console.log("Error:" + JSON.stringify(errorResponse));
				});
			};

		} ]);


 

auditControllers.controller('refreshController', [ '$scope',  '$timeout', 'auditmoreService',
		function refreshController($scope, $timeout, auditmoreService) {
			var updateClock = function() {

				var length = $scope.audits.length;
				//console.log("Audit:" + JSON.stringify( $scope.audits[0]  ));
		 		//console.log($scope.deviceSerial);
		 		var time = 0;
				console.log( "time " + time );
				//console.log(JSON.stringify($scope.audits));
				if( length > 0 ){
					time = $scope.audits[0].time; 
					//console.log(time);
					if(time == null){
						time = 0;
					}
				}
				//var formatedDate = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' +  time.getDate()  + ' ' + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds ();
				
				auditmoreService.get({serial: $scope.deviceSerial,  date: time  }, {}, function success(response) {
					//console.log("refresh audit Success:" + JSON.stringify(response));
					console.log("response array length: " + response.length);
					if(response.length > 1){
						$scope.audits =  $scope.audits.concat( response);
					}
					if( $scope.audits.length > 50 ){
						$scope.audits = $scope.audits.slice(0, 49);
					}
					//console.log($scope.audits.length);
				}, function error(errorResponse) {
					//alert("Connot connect to server.");
					console.log("Error:" + JSON.stringify(errorResponse));
				});
				 
				$timeout(function() {
					updateClock();
				}, 3000);
			};
			updateClock();

		} ]);
