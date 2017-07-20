import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";

angular.module('compassionIntranet').service('rssFeedService', ['$http', '$q', 'COM_CONFIG', function ($http, $q, COM_CONFIG) {
    function getRssItems(user) {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userRssFeedsListTitle).items
            .filter("COM_RssFeedUserId eq '" + user + "'")
            .get()
            .then(function(data){
                var promises = new Array();
                for(var i = 0; data.length > i; i++)
                {
                    var p = getRssUrl(data[i].Id);
                    promises.push(p)
                }
                $q.all(promises).then(function(response){
                    defer.resolve(response);
                });                
            });

        return defer.promise;
    }
    function getRssUrl(id) {
        var defer = $q.defer();
        let web = new Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.rssFeedsListTitle).items
            .getById(id)
            .get()
            .then(function(item){ 
                defer.resolve(item.COM_RssFeedUrl.Url); 
            });

        return defer.promise;
    }
    function getRssFeeds(feeds) {
        var defer = $q.defer(),
            promises = [];
        for (var i = 0; feeds.length > i; i++) {
            var p = getRssFeed(feeds[i]) ;
            promises.push(p);
        }
        $q.all(promises).then(function (response) {
            defer.resolve(response);
        });
        return defer.promise;
    }
    function getRssFeed(url) {
        var defer = $q.defer();
        var formats = ['ddd, DD MMM YYYY HH:mm:ss ZZ', 'ddd, DD MMM YY HH:mm:ss ZZ'];
			
			
        $http.jsonp('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url)).then(function (response) {
            if (!response.data) {
                console.error('Unable to fetch RSS feed from provided URL. Please check the URL.');
            }
            var feeds = response.data.items;

            for (var i = 0; i < feeds.length; ++i) {
                var f = feeds[i];								
                f.publishedDate = moment(f.pubDate).format();
                f.publishedTimeSpan = getPublishedDuration(f.publishedDate);
            }

            defer.resolve(feeds);
        });
        return defer.promise;
    }
    function getPublishedDuration(then) {
        var now = moment().utc();
        var ms = moment(now).diff(moment(then));
        //var ms = now.diff(then);
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

        return s;
    }
    this.getMyRssFeeds = function (user) {
        var defer = $q.defer();
        getRssItems(user).then(function (feeds) {
            getRssFeeds(feeds).then(function (feedContent) {
                defer.resolve(feedContent);
            });
        });

        return defer.promise;
    };
}]);