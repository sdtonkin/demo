'use strict';
angular.module('compassionIntranet').service('newHireService', ['$http', '$q', 'COM_CONFIG', 'common', function ($http, $q, COM_CONFIG, common) {
    var ctrl = this;

    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getHire = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.newHire).items
            .get()
            .then(function (data) {
                var links = [];
                var promises = [];
                var items = data;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    g.contact = item.COM_Contact;
                    g.date = item.CreatedBy;
                    links.push(g);
                }
                defer.resolve(links);
            });

        return defer.promise;
    }

}]);