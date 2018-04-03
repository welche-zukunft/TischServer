angular.module('protocoll', ['ngMessages']).controller('protocollmanager', ['ProtocollService' ,'$scope', '$http', '$location', '$window', 
	
	function(ProtocollService, $scope, $http, $location, $window) {
	
		var self = this;
		
		console.log("Started protocoll controller");
		
	
		// SET SOME GLOBAL VARIABLES 
			
		self.sentence = {
				id	:	null,
				content : ""
		}
		
		
		//	LISTENER METHODS FOR CLICK HANDLING
		
		self.submitSentence = submitSentence;

		
		function submitSentence(){
			console.log("Submit current sentence : " + self.sentence);
			console.log(self.sentence.content);
			
			if (!self.protocollform.$valid || self.sentence == ""){
				console.log("Input Data is not valid!");
				return;
			}
			
			//	delegate rest communication   		
			ProtocollService.submitSentence(self.sentence)
	        .then(
	        function(result){
	        	console.log(result);
	        },
	        function(errResponse){
	            console.error('Error while submitting sentence');
	        }
	        );
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