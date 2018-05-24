'use strict';
angular.module('compassionIntranet').service('anniversaryService', ['$http', '$q', 'userProfileService', 'COM_CONFIG', 'common', function ($http, $q, userProfileService, COM_CONFIG, common) {
    var ctrl = this;

    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getAnniversary = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.anniversary).items
            .select('StartDate', 'COM_Contact/FirstName', 'COM_Contact/LastName', 'COM_Contact/SipAddress', '*')
            .expand('COM_Contact')
            .get()
            .then(function (data) {
                var events = [];
                var items = data;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    var firstName = (item.COM_Contact.FirstName == null ? '' : item.COM_Contact.FirstName);
                    var lastName = (item.COM_Contact.LastName == null ? '' : item.COM_Contact.LastName);
                    var yearCount = moment().diff(item.StartDate, 'years');

                    g.startDate = moment(item.StartDate).format('MMMM DD, YYYY');
                    g.eventType = (item.COM_EventType.TermGuid == COM_CONFIG.terms.anniversaryTermId ? 'anniversary' : 'retirement');
                    g.description = (g.eventType == 'retirement' ? g.eventType : yearCount + ' year anniversary');
                    g.targetPicUrl = COM_CONFIG.pictureUrl + item.COM_Contact.SipAddress;
                    g.targetName = firstName + ' ' + lastName;

                    events.push(g);
                }

                defer.resolve(events);
            });

        return defer.promise;
    }

}]);