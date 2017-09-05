'use strict';
angular.module('compassionIntranet').service('photoService', ['$http', '$q', 'COM_CONFIG', 'storage','common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;
    var photoKey = 'CI-INTRANET-PHOTOS';    
    
    // clear local storage if url param is detected
    common.checkForClearStatement('clearPhotos', photoKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();  

    // set default expiration at 24 hours
    ctrl.expirationDuration = 24;
    ctrl.getPhotos = getPhotos;
    function getPhotos() {
        var defer = $q.defer();        
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.missionPhotos).items
            .select('COM_PhotoCaption', 'EncodedAbsUrl')
            .get()
            .then(function (data) {
                var photos = [];
                for (var i = 0; i < data.length; i++) {
                    var p = data[i];
                    var photo = {};
                    photo.description = p.COM_PhotoCaption;
                    photo.source = p.EncodedAbsUrl + (p.EncodedAbsUrl.indexOf('?') != -1 ? '&' : '?') + 'RenditionId=5';
                    photos.push(photo);
                }
                defer.resolve(photos);
            })
            .catch(e => { console.error(e); });

        return defer.promise;
    }
}]);