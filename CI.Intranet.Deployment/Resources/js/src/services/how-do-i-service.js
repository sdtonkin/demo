'use strict';
angular.module('compassionIntranet').service('howDoIService', ['$http', '$q', 'COM_CONFIG', 'common', 'storage', function ($http, $q, COM_CONFIG, common, storage) {
    var ctrl = this;

    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.gethowDoI = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.resourceLinks).items
            .get()
            .then(function (data) {
                var links = data;
                var response = [];
                for (var i = 0; i < links.length; i++) {
                    var l = links[i];
                    var g = {};
                    g.id = l.Id;
                    g.name = l.Title;
                    g.url = l.COM_LinkUrl.Url;
                    response.push(g);
                }
                defer.resolve(response);
            });

        return defer.promise;
    }

}]);