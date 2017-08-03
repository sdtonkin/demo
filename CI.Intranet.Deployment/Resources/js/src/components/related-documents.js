// import pnp from "sp-pnp-js";
var ctrlName = "relatedDocCtrl";
var myApp = angular.module('');

myApp.controller(ctrlName, ['$scope', 'relatedDocService', 'COM_CONFIG', function($scope, relatedDocService, COM_CONFIG) {

    // var cacheObj = pnp.storage.local;
    // if (!_CONFIG.useCaching) {
    //     cacheObj.delete(ctrlName);
    // }
    // cacheObj.getOrPut(ctrlName, relatedDocService-service.getData).then(function(data) {
    relatedDocService.getData().then(function (data) {
        $scope.documents = COM_CONFIG.rootWeb;

        if (data.length === 0) {
            $scope.notFound = "No related documents found";
        } else if (data[0].contentType === true) {

            $scope.documents = data;
        } 
    });

}]).component('relatedDoc', {
    template: require('../../includes/Related-Documents.html'),
    controller: ctrlName,
    controlleras: 'ctrl',
    bindings: {
        documentlimit: '@'
}
});