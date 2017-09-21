'use strict';
angular.module('compassionIntranet').service('newHireService', ['$http', '$q', 'userProfileService', 'COM_CONFIG', 'common', function ($http, $q, userProfileService, COM_CONFIG, common) {
    var ctrl = this;

    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getHire = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.newHire).items
            .get()
            .then(function (data) {
                var newHires = [];
                var promises = [];
                var items = data;
                console.log('new hire list', data);
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    var p1 = userProfileService.getUserFromUserInfo(item.COM_ContactId);
                    promises.push(p1);
                    g.startDate = moment(item.StartDate).format('MMMM DD, YYYY');

                    newHires.push(g);
                }
                $q.all(promises).then(function (data) {
                    for (var i = 0; i < newHires.length; i++) {
                        var g = newHires[i];
                        var firstName = (data[i].FirstName == null ? '' : data[i].FirstName);
                        var lastName = (data[i].LastName == null ? '' : data[i].LastName);
                        g.targetPicUrl = COM_CONFIG.pictureUrl + data[i].UserName;
                        g.targetName = firstName + ' ' + lastName;
                        newHires[i] = g;
                    }

                    defer.resolve(newHires);
                });
            });

        return defer.promise;
    }

}]);