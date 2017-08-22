'use strict';
angular.module('compassionIntranet').service('globalPartnerService', ['$http', '$q', 'COM_CONFIG', 'storage', 'common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;

            let web = new $pnp.Web(COM_CONFIG.rootWeb);
            web.lists.getByTitle(COM_CONFIG.lists.missionPhotos).items
                .get()
                .then(function (data) {
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