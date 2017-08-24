'use strict';
angular.module('compassionIntranet').service('howDoIService', ['$http', '$q', 'COM_CONFIG', 'common', 'storage', function ($http, $q, COM_CONFIG, common, storage) {

    ctrl.howDoi = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.resourceLinks).items
            .get()
            .then(function (data) {
                var links = [];
                var promises = [];
                var items = data;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    g.id = item.Id;
                    g.name = item.Title;
                    g.url = item.Url.Url;
                    response.push(p);
                }
                defer.resolve(response);
            });

            return defer.promise;
        }

}]);