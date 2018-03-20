angular.module('protocoll').factory('ProtocollService', ['$http', '$q', '$location', function($http, $q, $location){
 
    var REST_SERVICE_URI = '//' + $location.$$host + ':' + $location.$$port;
 
    var factory = {
    	submitSentence : submitSentence
    };
 
    return factory;
 
 
    function submitSentence(sentence) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + "/submitsentence/", sentence)
            .then(
            function (response) {
                console.log('Success on submitting sentence');
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while submitting sentence');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    
    
   
    
    
}])
