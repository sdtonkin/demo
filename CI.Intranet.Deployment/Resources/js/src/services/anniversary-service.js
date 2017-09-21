'use strict';
angular.module('compassionIntranet').service('anniversaryService', ['$http', '$q', 'userProfileService', 'COM_CONFIG', 'common', function ($http, $q, userProfileService, COM_CONFIG, common) {
    var ctrl = this;

    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getAnniversary = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.anniversary).items
            .get()
            .then(function (data) {
                console.log('anniversary', data);
                var events = [];
                var promises = [];
                var items = data;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    var p1 = userProfileService.getUserFromUserInfo(item.COM_ContactId);
                    promises.push(p1);
                    g.startDate = moment(item.StartDate).format('MMMM DD, YYYY');
                    g.eventType = (item.COM_EventType.TermGuid == COM_CONFIG.anniversaryTermId ? 'anniversary' : 'retirement');
                    g.description = moment().diff(item.StartDate, 'years') + ' year ' + g.eventType;
                    
                    events.push(g);
                }
                $q.all(promises).then(function (data) {
                    console.log(data);
                    for (var i = 0; i < events.length; i++) {
                        var g = events[i];
                        g.targetPicUrl = COM_CONFIG.pictureUrl + data[i].UserName;
                        g.targetName = data[i].FirstName + ' ' + data[i].LastName;
                        events[i] = g;
                    }
                    defer.resolve(events);
                });            
            });

        return defer.promise;
    }

}]);