import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";
import moment from "moment";

angular.module('compassionIntranet').service('myRssService', ['$http', '$q', 'COM_CONFIG', function ($http, $q, COM_CONFIG) {
    function getRssUrls(user) {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.userRssFeedsListTitle).items
            .filter("COM_RssFeedUser eq '" + user + "'")
            .get()
            .then(function(data){
                defer.resolve(data);
            });

        return defer.promise;
    }

    function getRssFeeds(feeds) {
        var defer = $q.defer(),
            feedContent = new Array();
        for(var i = 0; feeds.length < i; i++)
        {
            $http.get(feeds[i])
                .success(function(data, status, headers){
                    feedContent.push(data);
                });
        }
        defer.resolve(feedContent);
        return defer.promise;
    }
    this.getMyRssFeeds = function (user) {
        var defer = $q.defer();
        getRssUrls(user)
            .then(function(feeds){
                getRssFeeds(feeds)
                    .then(function(feedContent){
                        defer.resolve(feedContent);
                    });
            });

        return defer.promise();        
    }
}]
);