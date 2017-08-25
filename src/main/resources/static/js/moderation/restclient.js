angular.module('moderation').factory('EventExchangeService', ['$http', '$q', '$location', function($http, $q, $location){
 
    var REST_SERVICE_URI = '//' + $location.$$host + ':' + $location.$$port;
 
    var factory = {
    	submitCurrentEvent : submitCurrentEvent,
    	getAllImages	:	getAllImages,
    	getAllEvents	:	getAllEvents
    };
 
    return factory;
 
 
    function submitCurrentEvent(event) {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + "/submitcurrentevent/", event)
            .then(
            function (response) {
                console.log('Success on submitting Event');
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while submitting Event');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    function getAllImages() {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + "/getimages/", event)
            .then(
            function (response) {
                console.log('Success on getting images');
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while gettin images');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    
    function getAllEvents() {
        var deferred = $q.defer();
        $http.post(REST_SERVICE_URI + "/getevents/", event)
            .then(
            function (response) {
                console.log('Success on getting events');
                deferred.resolve(response.data);
            },
            function(errResponse){
                console.error('Error while gettin events');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
    
   
    
    
}])
