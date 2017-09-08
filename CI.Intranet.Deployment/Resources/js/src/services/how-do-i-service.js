'use strict';
angular.module('compassionIntranet').service('howDoIService', ['$http', '$q', 'COM_CONFIG', 'common', 'storage', function ($http, $q, COM_CONFIG, common, storage) {
    var ctrl = this;

    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.gethowDoI = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.workResources).items
            .filter("COM_ResourceType eq 'How Do I'")
            .get()
            .then(function (data) {
                data.map(function (item) {
                    if (item.COM_LinkUrl)
                        item.url = item.COM_LinkUrl.Url;
                    if (item.COM_ToolbarIconUrl)
                        item.iconUrl = item.COM_ToolbarIconUrl;
                    if (item.Title)
                        item.title = item.Title;
                });
                console.log('how do I', data);
                defer.resolve(data);
            });

        return defer.promise;
    }

}]);