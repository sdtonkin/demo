'use strict';
var serviceName = 'photoService';
angular.module('compassionIntranet').service(serviceName, ['$http', '$q', 'COM_CONFIG', 'storage', 'common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;
    var store = _.find(COM_CONFIG.storage, function (s) {
        return s.service == serviceName;
    });
    var photoKey = store.key;    
    
    // clear local storage if url param is detected
    common.checkForClearStatement(store.clearCommand, photoKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();  

    // set default expiration at 24 hours
    ctrl.expirationDuration = store.expire;
    ctrl.getPhotos = getPhotos;
    function getPhotos() {
        var defer = $q.defer();        
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.missionPhotos).items
            .select('COM_PhotoCaption', 'EncodedAbsUrl', 'Created')
            .orderBy('Created', false)
            .top(4)
            .get()
            .then(function (data) {
                var photos = [];
                for (var i = 0; i < data.length; i++) {
                    var p = data[i];
                    var photo = {};
                    photo.description = p.COM_PhotoCaption;
                    photo.source = p.EncodedAbsUrl + (p.EncodedAbsUrl.indexOf('?') != -1 ? '&' : '?') + 'RenditionId=5';
                    photo.created = new moment(p.Created);
                    photos.push(photo);
                }
                if (!COM_CONFIG.isProduction) { console.log('photo shares', photos); }
                defer.resolve(photos);
            })
            .catch(e => { console.error(e); });

        return defer.promise;
    }
}]);