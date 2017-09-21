'use strict';
angular.module('compassionIntranet').service('gratitudesService', ['$http', '$q', 'COM_CONFIG', 'common', 'userProfileService', function ($http, $q, COM_CONFIG, common, userProfileService) {
    var ctrl = this;
    var gratsKey = 'CI_GROUPS_KEY';

    common.checkForClearStatement('clearGratitudes', gratsKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getGratitudes = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.gratitudes).items
            .get()
            .then(function (data) {
                var grats = [];
                var promises = [];
                var items = data,
                    pplCount = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    g.type = item.COM_GratitudeType;
                    g.description = item.COM__x0020_GratitudeDescription.substring(0, 175);
                    var p1 = userProfileService.getUserFromUserInfo(item.COM_ContactId);                    
                    var p2 = userProfileService.getUserFromUserInfo(item.AuthorId);
                    promises.push(p1);
                    promises.push(p2);
                    grats.push(g);
                }
                $q.all(promises).then(function (data) {
                    for (var i = 0; i < grats.length; i++) {
                        var g = grats[i];
                        var firstName = (data[pplCount].FirstName == null ? '' : data[pplCount].FirstName);
                        var lastName = (data[pplCount].LastName == null ? '' : data[pplCount].LastName);

                        g.targetPicUrl = COM_CONFIG.pictureUrl + data[pplCount].UserName;
                        g.targetName = firstName + ' ' + lastName;
                        pplCount++;
                        g.submittedBy = data[pplCount].FirstName + ' ' + data[pplCount].LastName;
                        pplCount++;
                        grats[i] = g;
                    }
                    var response = _.sortBy(grats, 'Created').reverse();
                    defer.resolve(response);
                });
            });

        return defer.promise;
    }
}]);