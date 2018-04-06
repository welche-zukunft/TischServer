angular.module('protocoll', ['ngMessages']).controller('protocollmanager', ['ProtocollService' ,'$scope', '$http', '$location', '$window', 
	
	function(ProtocollService, $scope, $http, $location, $window) {
	
		var self = this;
		
		console.log("Started protocoll controller");
		
	
		// SET SOME GLOBAL VARIABLES 
		
    	self.emptySentenceError = false;
			
		self.sentence = {
				id	:	null,
				content : '',
				workshopId : 0
		}
		
		self.workshops = [
				{ value: 1, name: 'Ein Land ohne Armut?' }, 
				{ value: 2, name: 'Grundeinkommen als Lebensgefühl' }, 
				{ value: 3, name: 'Bedingungslose Konsumenten?' }, 
				{ value: 4, name: 'Vollbeschäftigung' }, 
				{ value: 5, name: 'Streik! – Über die Macht der abhängig Beschäftigten' }, 
				{ value: 6, name: 'Das Ende der Banken ist der Anfang vom Grundeinkommen ' }, 
				{ value: 7, name: 'Die Kampagne' }, 
				
				{ value: 8, name: 'Macht und Maschinen' }, 
				{ value: 9, name: 'Wen schützt der Staat?' }, 
				{ value: 10, name: 'Mehr Demokratie oder nur anders?' }, 
				{ value: 11, name: 'Government curtesy of Silicon Valley?' }, 
				{ value: 12, name: 'Die Vereinigten Staaten von Europa?' }, 
				{ value: 13, name: 'Zurück auf Los' }
		]
		
		
		//	LISTENER METHODS FOR CLICK HANDLING
		
		self.submitSentence = submitSentence;
		self.setWorkshopForCurrentSentence = setWorkshopForCurrentSentence;

		
		function submitSentence(){
			if (self.sentence.content == ''){
				console.log('empty sentence. return...');
				self.emptySentenceError = true;
				return;
			}
			
			if (self.sentence.workshopId == 0){
				console.log('No workshop selected. return...');
				return;
			}
			
			console.log("Submit current sentence : " + self.sentence.content);
			if (self.sentence.content.slice(-1) != '.'){
				self.sentence.content = self.sentence.content.concat('.');
				console.log('append . to sentence ' + self.sentence.content);
			}
			
			if (!self.protocollform.$valid || self.sentence == ""){
				console.log("Input Data is not valid!");
				return;
			}
			
			//	delegate rest communication   		
			ProtocollService.submitSentence(self.sentence)
	        .then(
	        function(result){
	        	console.log(result);
	        	self.sentence.content = '';
	        	self.emptySentenceError = false;
	        },
	        function(errResponse){
	            console.error('Error while submitting sentence');
	        }
	        );
		}
		
		function setWorkshopForCurrentSentence(workshopId){
			console.log("Set workshop for current Event : " + workshopId);
			self.sentence.workshopId = workshopId;
		}
		
		
	
		//  UTILS
		
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