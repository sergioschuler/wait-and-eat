'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('LandingPageController', [function() {

	}])

	.controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {
		// Connect $scope.parties to live Firebase data.
		var partiesRef = new Firebase('https://waitandeat-sergio.firebaseio.com/parties');
		
		$scope.parties = $firebase(partiesRef);

		// Object to store data from waitlist form.
		$scope.newParty = {name: '', phone: '', size: ''};

		// Function to save a new party to the waitlist.
		$scope.saveParty = function() {
			$scope.parties.$add($scope.newParty);
			$scope.newParty = {name: '', phone: '', size: ''};
		};

		// Function to send a text message to a party
		$scope.sendTextMessage = function(party) {
			var textMessageRef = new Firebase('https://waitandeat-sergio.firebaseio.com/textMessages');
			var textMessages = $firebase(textMessageRef);
			var newTextMessage = {
				phoneNumber: party.phone,
				size: party.size,
				name: party.name 
			};
			textMessages.$add(newTextMessage);
		};
	}]);