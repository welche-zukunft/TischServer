angular.module('moderation', []).controller('eventmanager', ['EventExchangeService' ,'$scope', '$http', '$location', '$window', 
	
	function(EventExchangeService, $scope, $http, $location, $window) {
	
		var self = this;
		
		console.log("Started event Manager controller");
				
		//	STARTUP
		
		getAllEvents();
		update();
		
	
	
		// SET SOME GLOBAL VARIABLES 
		
		// workshop list
		
		self.workshops = [
				{ value: 1, name: 'Fiskalische und andere Götterdämmerungen' }, 
				{ value: 2, name: 'Patient Zero - der Indexpatient Deutsche Bank' },
				{ value: 3, name: 'Armageddon' },
				{ value: 4, name: 'Der Weg zur Hölle ist mit guten Vorsätzen gepflastert' },
				{ value: 5, name: 'Recht und Gesetz - Staatsverluste?!' },
				{ value: 6, name: 'Risikomanagement - Guter Rat – Notvorrat' },
				{ value: 7, name: 'Energy transitions' },
				{ value: 8, name: 'Wetter - Eine neue Normalität' },
				{ value: 9, name: 'Geopolitics - Intersections' },
				{ value: 10, name: 'Arbeit - Zukunft ohne Arbeitgeber?' },
				{ value: 11, name: 'Elite &amp; Demokratie - Rolle rückwärts' },
				{ value: 12, name: 'Agriculture - Coffee shortage and other inconveniences' }		
		];
		
		//	current event to edit
			
		self.currentEvent = {
				id	:	null,
				title	:	"-",
				content	:	"-",
				year	:	"",
				workshopId	:	0,
				imageName	:	null
		}
		
		//	event list
		
		self.events = [];
		
		//	image list
		
		self.images = [];
	
	
		
		//	LISTENER METHODS FOR CLICK HANDLING
		
		self.submitCurrentEvent = submitCurrentEvent;
		self.createNewEvent = createNewEvent;
		self.update = update;
		self.setImageForCurrentEvent = setImageForCurrentEvent;
		self.setCurrentEvent = setCurrentEvent;
		
		
		function submitCurrentEvent(){
			console.log("Submit current Event : " + self.currentEvent);
						
			if (self.currentEvent.workshopId == 0){
				$window.alert("Bitte einen Workshop auswählen!");
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
		
		
		function createNewEvent(){
			console.log("Creating new Event...");
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
		
		
		
		//	UTIL FUNCTIONS
		
		
		function clearCurrentEvent(){
			console.log("Clear current event...");
			self.currentEvent = {
					id	:	null,
					title	:	"-",
					content	:	"-",
					year	:	"",
					workshopId	:	0,
					imageUrl	:	null
			}
			if(!$scope.$$phase) {
	    		$scope.$apply();
			}
		}
		
		
		self.resolveImageUrl = resolveImageUrl
		
		
		function resolveImageUrl(imageName){
			if (imageName){
				res = '//' + $location.$$host + '/uploads/images/' + imageName;
				return res;
			} else {
				return null;
			}
		}
		
	
}]);