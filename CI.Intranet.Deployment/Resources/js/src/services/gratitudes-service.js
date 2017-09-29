'use strict';
var serviceName = 'gratitudesService';
angular.module('compassionIntranet').service(serviceName, ['$http', '$q', 'COM_CONFIG', 'common', 'userProfileService', function ($http, $q, COM_CONFIG, common, userProfileService) {
    var ctrl = this;
    var store = _.find(COM_CONFIG.storage, function (s) {
        return s.service = serviceName;
    });
    var gratsKey = store.key;

    common.checkForClearStatement(store.clearCommand, gratsKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getGratitudes = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.gratitudes).items
            .select('COM_GratitudeType', 'COM__x0020_GratitudeDescription', 'COM_Contact/FirstName', 'COM_Contact/LastName', 'COM_Contact/SipAddress', 'Author/SipAddress', 'Author/FirstName', 'Author/LastName')
            .expand('COM_Contact', 'Author')
            .get()
            .then(function (data) {
                console.log('getGratitudes', data);
                var grats = [];
                var items = data,
                    pplCount = 0;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var targetFirstName = (item.COM_Contact.FirstName == null ? '' : item.COM_Contact.FirstName);
                    var targetLastName = (item.COM_Contact.LastName == null ? '' : item.COM_Contact.LastName);
                    var submittedByFirstName = (item.Author.FirstName == null ? '' : item.Author.FirstName);
                    var submittedByLastName = (item.Author.LastName == null ? '' : item.Author.LastName);
                    var g = {};
                    g.type = item.COM_GratitudeType;
                    g.description = item.COM__x0020_GratitudeDescription.substring(0, 175);
                    g.targetPicUrl = COM_CONFIG.pictureUrl + item.COM_Contact.SipAddress
                    g.targetName = targetFirstName + ' ' + targetLastName;
                    g.submittedBy = submittedByFirstName + ' ' + submittedByLastName;
                    grats.push(g);
                }

                defer.resolve(grats);
            });

        return defer.promise;
    }
}]);