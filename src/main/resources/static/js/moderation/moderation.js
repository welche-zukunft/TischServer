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
				{ value: 1, name: 'Götterdämmerungen' }, 
				{ value: 2, name: 'Patient Zero' },
				{ value: 3, name: 'Armageddon' },
				{ value: 4, name: 'Der Weg zur Hölle' },
				{ value: 5, name: 'Recht und Gesetz' },
				{ value: 6, name: 'Risikomanagement' },
				{ value: 7, name: 'Energy transitions' },
				{ value: 8, name: 'Wetter' },
				{ value: 9, name: 'Geopolitics' },
				{ value: 10, name: 'Arbeit' },
				{ value: 11, name: 'Identitäten'},
				{ value: 12, name: 'Elite' },
				{ value: 13, name: 'Agriculture' },		
				{ value: 14, name: 'Plenum'}
		];
		
		//	current event to edit
			
		self.currentEvent = {
				id	:	null,
				title	:	"",
				content	:	"",
				notes : "",
				year	:	"",
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
			self.currentEvent=event;
	
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
		
	
}]);