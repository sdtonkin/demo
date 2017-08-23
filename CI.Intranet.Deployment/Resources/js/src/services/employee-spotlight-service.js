'use strict';
angular.module('compassionIntranet').service('employeeSpotlightService', ['$http', '$q', 'COM_CONFIG', 'common', function ($http, $q, COM_CONFIG, common) {
    var ctrl = this;

    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getGratitudes = function () {

        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.gratitudes).items
            .get()
            .then(function (data) {
                var defer = $q.defer();
                var links = [];
                var promises = [];
                var items = data;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    g.type = item.COM_GratitudeType;
                    g.contact = item.COM_Contact;
                    g.submitted = item.CreatedBy;
                    g.description = item.COM_GratitudeDescription;
                }
            });

        return defer.promise;
    }

}]);