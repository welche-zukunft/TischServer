angular.module('recherche', ['ngFileUpload']).controller('uploader', ['$scope', 'Upload', '$http', function($scope, Upload, $http) {
	var self = this;
	self.submitUpload = submitUpload;
	
	console.log("Started recherche app");
	
    
    self.upload = function (file) {
        Upload.upload({
            url: '/upload/',
            data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                        
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    
    
    function submitUpload(file) {
    	console.log("submit image to upload ...");	
    	self.upload(file);
    };

    
       
    
    
}]);




 