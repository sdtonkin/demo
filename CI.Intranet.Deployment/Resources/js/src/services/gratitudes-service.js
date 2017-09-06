'use strict';
angular.module('compassionIntranet').service('gratitudesService', ['$http', '$q', 'COM_CONFIG', 'common', 'userProfileService', function ($http, $q, COM_CONFIG, common, userProfileService) {
    var ctrl = this;
    var picUrl = '/_layouts/15/userphoto.aspx?size=S&accountname=';
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
                console.log('gratitudesService.getGratitudes', data);
                var grats = [];
                var promises = [];
                var items = data,
                    pplCount = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    g.type = item.COM_GratitudeType;
                    g.description = item.COM__x0020_GratitudeDescription;
                    var p1 = userProfileService.getUserFromUserInfo(item.COM_ContactId);                    
                    var p2 = userProfileService.getUserFromUserInfo(item.AuthorId);
                    promises.push(p1);
                    promises.push(p2);
                    grats.push(g);
                }
                $q.all(promises).then(function (data) {
                    console.log(data);
                    for (var i = 0; i < grats.length; i++) {
                        var g = grats[i];
                        g.targetPicUrl = picUrl + data[pplCount].UserName;
                        g.targetName = data[pplCount].FirstName + ' ' + data[pplCount].LastName;
                        pplCount++;
                        g.submittedBy = data[pplCount].FirstName + ' ' + data[pplCount].LastName;
                        pplCount++;
                        grats[i] = g;
                    }

                    defer.resolve(grats);
                });
            });

        return defer.promise;
    }
}]);