'use strict';
angular.module('compassionIntranet').service('contactService', ['$http', '$q', 'COM_CONFIG', 'common', 'storage', function ($http, $q, COM_CONFIG, common, storage) {
    var ctrl = this;
    var delveUrl = '',
        picUrl = '/_layouts/15/userphoto.aspx?size=S&accountname=';

    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getContacts = function (siteCollectionUrl) {
        var defer = $q.defer();
        let web = new $pnp.Web(siteCollectionUrl);
        web.lists.getByTitle(COM_CONFIG.lists.contacts).items
            .get()
            .then(function (data) {
                var contact = data;
                var response = [];
                for (var i = 0; i < contact.length; i++) {
                    var c = contact[i];
                    var g = {};
                    g.id = c.Id;
                    g.name = c.Title;
                    g.title = c.JobTitle;
                    g.email = c.Email;
                    g.picUrl = _spPageContextInfo.siteAbsoluteUrl + picUrl + c.UserName;
                    g.profileUrl = delveUrl + c.UserName;
                    response.push(g);
                }
                defer.resolve(response);
            });

        return defer.promise;
    }

}]);
