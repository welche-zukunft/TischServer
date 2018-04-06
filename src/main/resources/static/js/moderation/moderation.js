angular.module('moderation', ['ngMessages']).controller('eventmanager', ['EventExchangeService' ,'$scope', '$http', '$location', '$window', 
	
	function(EventExchangeService, $scope, $http, $location, $window) {
	
		var self = this;
		
		console.log("Started event Manager controller");
				
		//	STARTUP
		
		getAllEvents();
		update();
		
	
	
		// SET SOME GLOBAL VARIABLES 
		
		// workshop list
		
		self.workshops = [
				{ value: 1, name: 'Pavlina Tcherneva' }, 
				{ value: 2, name: 'Harald Schumann' },
				{ value: 3, name: 'Cho Khong(UK)' },
				{ value: 4, name: 'Jürg Müller(Switzerland)' },
				{ value: 5, name: 'Eyvandur Gunnarsson (Iceland)' },
				{ value: 6, name: 'Evan Liaras (Greece)' },
				{ value: 7, name: 'José Soeiro(Portugal)' },
				{ value: 8, name: 'Isabel Feichtner (European law)' },
				{ value: 9, name: 'German law by Kai von Lewinski (German Law)' },
				{ value: 10, name: 'Otto Steinmetz (Banks)' },
				{ value: 11, name: 'Cornelia Dahaim (global workforce)'},
				{ value: 12, name: 'Joseph Vogl (eternal critic)' },
				{ value: 13, name: 'Ariella Helfgott' },		
				{ value: 14, name: 'Ulrike Hermann (Moderation)'},
				{ value: 15, name: 'Volker Heise (Moderation) '}
			];
		
		
		//	current event to edit
			
		self.currentEvent = {
				id	:	null,
				title	:	"",
				content	:	"",
				notes : "",
				year	:	"",
				month   :   0,
				day     :   0,
				workshopId	:	0,
				status : "NEWEVENT",
				imageName	:	null
		}
		
		//	event list
		
		self.events = [];
		
		//	image list
		
		self.images = [];
	
	
		
		//	LISTENER METHODS FOR CLICK HANDLING
		
		self.editNewEvent = editNewEvent;
		self.submitCurrentEvent = submitCurrentEvent;
		self.update = update;
		self.setImageForCurrentEvent = setImageForCurrentEvent;
		self.setCurrentEvent = setCurrentEvent;
		self.setWorkshopForCurrentEvent = setWorkshopForCurrentEvent;
		self.deleteImage = deleteImage;

		
		function editNewEvent(){
			console.log("Edit new Event");
			clearCurrentEvent();
			getAllEvents();
		}
		
		
		function submitCurrentEvent(){
			console.log("Submit current Event : " + self.currentEvent);
			
			if (!self.eventform.$valid || self.currentEvent.workshopId == 0){
				console.log("Input Data is not valid!");
				return;
			}
			
			//	delegate rest communication   		
			EventExchangeService.submitCurrentEvent(self.currentEvent)
	        .then(
	        function(result){
	        	console.log(result);
	        	clearCurrentEvent();
	        	getAllEvents();
	        },
	        function(errResponse){
	            console.error('Error while submitting Events');
	        }
	        );
		}
		
		
		
		
		function update(){
			console.log("Update Images...");
			
			//	delegate rest communication   		
			EventExchangeService.getAllImages()
	        .then(
	        function(result){
	        	self.images = result;
	        	console.log(result);
	        },
	        function(errResponse){
	            console.error('Error while submitting Events');
	        }
	        );
	
		}
		
		function setImageForCurrentEvent(imageName){
			console.log("Set image url for current Event to " + imageName)
			self.currentEvent.imageName = imageName;
			console.log(self.currentEvent.imageName);
		}
		
		function setWorkshopForCurrentEvent(id){
			console.log("Set workshop for current Event ")
			self.currentEvent.workshopId = id;
		}
		
		
		function getAllEvents(){
			console.log("Update Images...");
			
			//	delegate rest communication   		
			EventExchangeService.getAllEvents()
	        .then(
	        function(result){
	        	self.events = result;
	        	console.log(result);
	        },
	        function(errResponse){
	            console.error('Error while submitting Events');
	        }
	        );
	
		}
		
		function setCurrentEvent(event){
			console.log("Set current Event...");
			console.log(event);
			self.currentEvent=event;
			if(!$scope.$$phase) {
	    		$scope.$apply();
			}
		}
		
		function deleteImage(){
			self.currentEvent.imageName=null;
		}
		
		
		
		
		
		//	UTIL FUNCTIONS
		
		
		function clearCurrentEvent(){
			console.log("Clear current event...");
			self.eventform.$setPristine(); 

			
			console.log("Event form submitted ? " + self.eventform.$submitted);
			
			self.currentEvent = {
					id	:	null,
					title	:	"",
					content	:	"",
					notes : "",
					year	:	"",
					month   : 0,
					day     : 0,
					workshopId	:	0,
					status : "NEWEVENT",
					imageName	:	null
			}
			if(!$scope.$$phase) {
	    		$scope.$apply();
			}
		}
		
		
		self.resolveImageUrl = resolveImageUrl;
		
		
		function resolveImageUrl(imageName){
			if (imageName){
				res = '//' + $location.$$host + '/uploads/images/' + imageName;
				return res;
			} else {
				return null;
			}
		}
		
		
		//	Input Field Pattern
		
		self.onlyNumbers = /^\d+$/;
		
		
		//  calendar data 
		
		self.months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
		self.years = [2007, 2008, 2009, 2010, 2011, 2012];
		self.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
		
		
		
	
}]);