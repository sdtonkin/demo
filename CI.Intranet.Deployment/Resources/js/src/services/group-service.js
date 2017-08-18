'use strict';
angular.module('compassionIntranet').service('groupService', ['$http', '$q', 'COM_CONFIG', 'common', 'storage', function ($http, $q, COM_CONFIG, common, storage) {
    var ctrl = this;
    var groupsKey = '4FC856F1-CCF7-49C8-9971-22861DE3EB56' + _spPageContextInfo.userId;
    
    var delveUrl = '';
    // clear local storage if url param is detected
    common.checkForClearStatement('clearGroups', groupsKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    // set default expiration at 24 hours
    ctrl.expirationDuration = 24;
    ctrl.getGroups = function () {
        var defer = $q.defer();
        var local = storage.get(groupsKey);
        if (local == null) {
            local = {};
            local.isExpired = true;
        }   
        if (!local.isExpired)
            defer.resolve(local);
        else {
            defer.resolve(getGroups());
        }

        return defer.promise;
    };
    function getGroups() {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.groupInfo).items
            .get()
            .then(function (data) {
                var groups = [];
                var promises = [];
                var items = data;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var g = {};
                    g.id = item.Id;
                    g.name = item.Title;
                    g.url = item.COM_GroupSiteUrl.Url;
                    g.description = item.COM_GroupDescription;
                    g.profileUrl = delveUrl;
                    groups.push(g);
                    promises.push(getGroupLeadership(g.url, item.Id));
                }
                try {
                    $q.all(promises).then(function (response) {
                        for (var i = 0; i < groups.length; i++) {
                            var id = groups[i].id;
                            groups[i].leaders = _.find(response, function (l) {
                                return l.groupId == id;
                            }).leaders;
                        }

                        storage.set(groupsKey, groups, 0);
                        defer.resolve(groups);
                    });
                }
                catch(e) {
                    defer.resolve(groups);
                }
            });

        return defer.promise;
    }
    function getGroupLeadership(siteUrl, groupId) {
        var defer = $q.defer();
        var picUrlTemplate = '/_layouts/15/userphoto.aspx?size=S&username=';
        var web = new $pnp.Web(siteUrl);
        web.lists.getByTitle(COM_CONFIG.lists.groupLeadership).items.select('Title', 'COM_Contact/Title', 'COM_Contact/UserName', 'COM_Contact/JobTitle').expand('COM_Contact').get().then(function (data) {
            var leaders = [];
            var groupLeaders = [];
            var groupLeader = {};
            groupLeader.groupId = groupId;

            var items = data;
            for (var i = 0; i < items.length; i++) {
                var leader = items[i];
                var person = leader.COM_Contact;
                var l = {};
                l.name = person.Title;
                l.title = person.JobTitle;
                l.picUrl = _spPageContextInfo.siteAbsoluteUrl + picUrlTemplate + person.UserName;
                leaders.push(l);
            }
            groupLeader.leaders = leaders;
            defer.resolve(groupLeader);
        });

        return defer.promise;
    }
}]);