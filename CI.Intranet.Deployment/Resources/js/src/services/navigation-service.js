'use strict';
var serviceName = 'navigationService';
angular.module('compassionIntranet').service(serviceName, ['$http', '$q', 'COM_CONFIG', 'common', 'storage', function ($http, $q, COM_CONFIG, common, storage) {
    var ctrl = this;
    var store = _.find(COM_CONFIG.storage, function (s) {
        return s.service == serviceName;
    });
    var navKey = store.key;
    // clear local storage if url param is detected
    common.checkForClearStatement(store.clearCommand, navKey);
    ES6Promise.polyfill();
    // set default expiration at 0 hours
    ctrl.expirationDuration = store.expire;
    ctrl.getAllNodes = function () {
        var defer = $q.defer();
        var local = storage.get(navKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }
        if (!local.isExpired)
            defer.resolve(local);
        else {
            defer.resolve(getNavigationNodes());
        }

        return defer.promise;
    };
    function getNavigationNodes() {
        
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.navigation).items
            .get()
            .then(function (data) {
                var nodes = [];
                for (var i = 0; i < data.length; i++) {
                    var node = {};
                    var n = data[i];
                    node.url = n.COM_NavNodeUrl.Url;
                    node.title = n.Title;
                    nodes.push(node);
                }
                storage.set(navKey, nodes, 0);
                defer.resolve(nodes);
            });

        return defer.promise;
    }
    
}]);