import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";
//import parser from 'rss-parser';

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
                var f = {};
                f.title = item.Title;
                f.url = item.COM_RssFeedUrl.Url;
                defer.resolve(f); 
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
    function getRssFeed(feed) {
        var defer = $q.defer();
			
        $http.jsonp(COM_CONFIG.rssProxyUrl + encodeURIComponent(feed.url)).then(function (response) {
            if (!response.data) {
                console.error('Unable to fetch RSS feed from provided URL. Please check the URL.');
            }
            var feeds = _.sortBy(response.data.items, function(item){ return item.pubDate; }).reverse();

            for (var i = 0; i < feeds.length; ++i) {
                var f = feeds[i];
                f.feedTitle = feed.title;
                f.pDate = moment().utc(f.pubDate);
                f.publishedDate = moment(f.pubDate);
                f.currentTime = moment.utc().format();
                f.publishedSpanString = getPublishedDurationString(f.pubDate);
            }

            defer.resolve(feeds);
        });
        return defer.promise;
    }
    function getPublishedDurationString(then) {
        var ms = moment.utc().diff(moment.utc(then));
        var d = moment.duration(ms);
        var t = {};
        t.hour = d.asHours();
        t.hourFormat = Math.floor(d.asHours());
        t.minute = moment.utc(ms).format('m');
			
        if (t.hour > 0) {
            var h = Math.floor(t.hour);
            return h + 'h';
        }
        else if (t.minute == '0')
            return '';
        else
            return t.minute + 'm';

        return t;
    }

    this.getMyRssFeeds = function (user, articleLimit) {
        var defer = $q.defer();
        getRssItems(user).then(function (feeds) {
            getRssFeeds(feeds).then(function (feedContent) {
                var feedList = [];
                for (var i = 0; feedContent.length > i; i++) {
                    var f = {};
                    f.title = feedContent[i][0].feedTitle;
                    f.articles = feedContent[i].slice(0, articleLimit);
                    feedList.push(f);
                }
                defer.resolve(feedList);
            });
        });

        return defer.promise;
    };
}]);