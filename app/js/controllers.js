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
		$scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};

		// Function to save a new party to the waitlist.
		$scope.saveParty = function() {
			$scope.parties.$add($scope.newParty);
			$scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
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
			party.notified = "Yes"
			$scope.parties.$save(party.$id);
		};
	}])
	.controller('AuthController', ['$scope', '$firebaseSimpleLogin', function($scope, $firebaseSimpleLogin) {
		var authRef = new Firebase('https://waitandeat-sergio.firebaseio.com/textMessages');
		var auth = $firebaseSimpleLogin(authRef);

		$scope.user = {email: '', password: ''}

		$scope.register = function() {
			auth.$createUser($scope.user.email, $scope.user.password).then(function(data) {
				console.log(data);
				auth.$login('password', $scope.user);
			});
		};

		$scope.login = function() {
			auth.$login('password', $scope.user).then(function(data) {
				console.log(data);
			});
		};
	}]);