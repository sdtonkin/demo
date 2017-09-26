'use strict';
angular.module('compassionIntranet').service('newHireService', ['$http', '$q', 'userProfileService', 'COM_CONFIG', 'common', function ($http, $q, userProfileService, COM_CONFIG, common) {
    var ctrl = this;

    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getHire = function () {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.newHire).items
            .select('StartDate', 'COM_Contact/FirstName', 'COM_Contact/LastName', 'COM_Contact/SipAddress')
            .expand('COM_Contact')
            .get()
            .then(function (data) {
                var newHires = [];
                var items = data;                
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    var firstName = (item.COM_Contact.FirstName == null ? '' : item.COM_Contact.FirstName);
                    var lastName = (item.COM_Contact.LastName == null ? '' : item.COM_Contact.LastName);
                    g.startDate = moment(item.StartDate).format('MMMM DD, YYYY');
                    g.targetPicUrl = COM_CONFIG.pictureUrl + item.SipAddress;
                    g.targetName = firstName + ' ' + lastName;

                    newHires.push(g);
                }

                defer.resolve(newHires);
            });

        return defer.promise;
    }

}]);