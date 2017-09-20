'use strict';
angular.module('compassionIntranet').service('rssFeedService', ['$http', '$q', 'COM_CONFIG', function ($http, $q, COM_CONFIG) {
    function getRssItems(user) {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userRssFeedsListTitle).items
            .filter("COM_RssFeedUserId eq '" + user + "'")
            .get()
            .then(function(data){
                var promises = new Array();
                for(var i = 0; data.length > i; i++)
                {
                    var p = getRssUrl(data[i]);
                    promises.push(p)
                }
                $q.all(promises).then(function(response){
                    defer.resolve(response);
                })
                .catch(function (err) {
                    defer.reject(err);
                });
            });

        return defer.promise;
    }
    function getRssUrl(feed) {
        if (feed.COM_RssFeedId < 0) return;
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.rssFeedsListTitle).items
            .getById(feed.COM_RssFeedId)
            .get()
            .then(function(item){ 
                var f = {};
                f.title = item.Title;
                f.url = item.COM_RssFeedUrl.Url;
                f.feedId = item.Id;
                f.id = feed.Id;
                defer.resolve(f); 
            })
            .catch(function (err) {
                defer.reject(err);
                console.log(err);
            });

        return defer.promise;
    }
    function getAllRssFeeds() {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.rssFeedsListTitle).items
            .get()
            .then(function (items) {
                var feeds = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var f = {};
                    f.id = item.Id;
                    f.title = item.Title;
                    f.url = item.COM_RssFeedUrl.Url;
                    feeds.push(f);
                }
                defer.resolve(feeds);
            })
            .catch(function (err) {
                console.error(err);
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
        if (feed == null) return;
			
        $http.jsonp(COM_CONFIG.rssProxyUrl + encodeURIComponent(feed.url)).then(function (response) {
            if (!response.data) {
                console.error('Unable to fetch RSS feed from provided URL. Please check the URL.');
            }
            var feeds = _.sortBy(response.data.items, function(item){ return item.pubDate; }).reverse();

            for (var i = 0; i < feeds.length; ++i) {
                var f = feeds[i];
                f.feedId = feed.feedId;
                f.feedTitle = feed.title;
                f.id = feed.id;
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
    function deleteMyFeed(id) {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userRssFeedsListTitle).items
            .getById(id)
            .delete()
            .then(function (item) {
                defer.resolve(true);
            });

        return defer.promise;
    }
    function addMyFeed(userId, feedId) {
        var defer = $q.defer();
        let web = new $pnp.Web(COM_CONFIG.rootWeb);
        web.lists.getByTitle(COM_CONFIG.lists.userRssFeedsListTitle).items
            .add({
                COM_RssFeedUserId: userId,
                COM_RssFeedId: feedId
            })
            .then(function (item) {
                defer.resolve(item);
            });

        return defer.promise;
    }
    this.getMyRssFeeds = function (user, articleLimit) {
        var defer = $q.defer();
        getRssItems(user).then(function (feeds) {
            getRssFeeds(feeds).then(function (feedContent) {
                var feedList = [];
                articleLimit = (articleLimit == null ? 5 : articleLimit);
                for (var i = 0; feedContent.length > i; i++) {
                    if (feedContent[i] == null || feedContent[i].length == 0) continue;
                    var f = {};
                    f.title = feedContent[i][0].feedTitle;
                    f.feedId = feedContent[i][0].feedId;
                    f.id = feedContent[i][0].id;
                    f.articles = feedContent[i].slice(0, articleLimit);                    
                    feedList.push(f);
                }
                defer.resolve(feedList);
            });
        });

        return defer.promise;
    };
    this.getAllRssFeeds = function () {
        var defer = $q.defer();
        getAllRssFeeds().then(function (feeds) {
            defer.resolve(feeds);
        });

        return defer.promise;
    };
    this.addMyFeed = function (userId, feedId) {
        var defer = $q.defer();
        addMyFeed(userId, feedId).then(function (response) {
            defer.resolve(response.data.Id);
        });

        return defer.promise;
    };
    this.removeMyFeed = function (id) {
        var defer = $q.defer();
        deleteMyFeed(id).then(function (feeds) {
            defer.resolve(feeds);
        });

        return defer.promise;
    }; 

}]);