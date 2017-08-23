'use strict';
angular.module('compassionIntranet').service('missionPhotoService', ['$http', '$q', 'COM_CONFIG', 'common', function ($http, $q, COM_CONFIG, common) {
    var ctrl = this;
    ctrl.getMissionPhotos = function(){

            let web = new $pnp.Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.missionPhotos).items
                .get()
                .then(function (data) {
                    var defer = $q.defer();
                    var photo = data;
                    var response = [];
                    for (var i = 0; i < photo.length; i++) {
                        var d = photo[i];
                        var p = {};
                        p.thumbnail = d.Thumbnail;
                        p.caption = d.COM_PhotoCaption;
                        response.push(p);
                    }
                    defer.resolve(response);
                });

        return defer.promise;    
    }

}]);