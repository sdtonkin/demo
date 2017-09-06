'use strict'

angular.module('compassionIntranet').service('newsService', ['$q', '$http', 'COM_CONFIG', function($q, $http, COM_CONFIG) {
    var ctrl = this;
    ctrl.getNews = getNews;
    ctrl.getEvents = getEvents;
    ES6Promise.polyfill();

    function getNews(searchTerm) {
        var defer = $q.defer();
        $pnp.sp.search({
            Querytext: 'ContentTypeId:' + COM_CONFIG.contentTypeIds.newsPage + '*' + (searchTerm == null ? '' : ' AND ' + searchTerms),
            SelectProperties: ['ContentType','Path', 'PublishingImage', 'SiteTitle', 'Title', 'ListItemID', 'RefinableDate00', 'RefinableString00', 'RefinableString01', 'RefinableString02', 'RefinableString04'],
        }).then(function (response) {
            
            response.PrimarySearchResults.map(function (item) {
                if (item.PublishingImage) {
                    item.ImageUrl = getImage(item.PublishingImage) + '?RenditionId=1';
                }
                if (item.RefinableDate00) {
                    var artDate = new Date(item.RefinableDate00);
                    item.ArticleDate = moment(artDate).format('MMMM D, YYYY');
                }                
                if (item.RefinableString00) {
                    item.LocationTag = item.RefinableString00;
                }
                if (item.RefinableString01) {
                    item.NewsType = item.RefinableString01;
                }
                if (item.RefinableString02) {
                    item.EventType = item.RefinableString02;
                }
                if (item.RefinableString04) {
                    item.Group = item.RefinableString04;
                }
            });
            console.log('news search', response.PrimarySearchResults);
            defer.resolve(response.PrimarySearchResults);
        });

        return defer.promise;
    }
    function getImage(element) {
        var src = $(element).attr('src');
        if (src.indexOf('?') != -1)
            src = src.substring(0, src.indexOf('?'));
        return src;
    }
    function getEvents(searchTerm) {
        var defer = $q.defer();
        $pnp.sp.search({
            Querytext: 'ContentTypeId:' + COM_CONFIG.contentTypeIds.event + '*' + (searchTerm == null ? '' : ' AND ' + searchTerms),
            SelectProperties: ['Path', 'Title', 'Location', 'RefinableDate00', 'RefinableDate01', 'RefinableDate02', 'RefinableString00', 'RefinableString01', 'RefinableString02'],
            SortList: [{
                'Property': 'RefinableDate01',
                'Direction': '1'
            }],
        }).then(function (response) {
            response.PrimarySearchResults.map(function (item) {
                if (item.PublishingImage) {
                    item.ImageUrl = getImage(item.PublishingImage) + '?RenditionId=1';
                }
                if (item.RefinableDate01) {
                    var eventDate = new Date(item.RefinableDate01);
                    item.RawEventDate = eventDate
                    item.EventDate = moment(eventDate).format('MMMM D, YYYY');
                    item.StartTime = moment(eventDate).format('h:mm a');
                }
                if (item.RefinableDate02) {
                    var endDate = new Date(item.RefinableDate02);
                    item.EndTime = moment(endDate).format('h:mm a');
                }
                if (item.RefinableString00) {
                    item.LocationTag = item.RefinableString00;
                }
                if (item.RefinableString01) {
                    item.NewsType = item.RefinableString01;
                }
                if (item.RefinableString02) {
                    item.EventType = item.RefinableString02;
                }
            });
            defer.resolve(response.PrimarySearchResults);
        });

        return defer.promise;
    }


    ctrl.getLandingNews = function(location, category, queryTerm, startrow) {
        var deferred = $q.defer();
        //var start = startrow ? startrow : 0;
        var queryText = queryTerm + ' Path:"' + bones.web.url + '/pages" ContentType:"News Page"';
        //var queryText = queryTerm + ' ContentType:"News Article"';
        if (location) {
            if (location !== "All") {
                queryText += ' RefinableString03:"' + location + '"'
            } else { //Look for All or null
                queryText += ' (RefinableString03:"' + location + '" OR RefinableString03:"")'
            }
        }
        if (category) { queryText += ' RefinableString15:"' + category + '"' }
        $pnp.sp.search({
            Querytext: queryText,
            SelectProperties: ['RefinableDate01', 'RefinableString00', 'RefinableString01', 'RefinableString02', 'RefinableString04', 'RefinableString06', 'RefinableString07', 'RefinableString12', 'RefinableString15', 'Path', 'PublishingImage', 'SiteTitle', 'Title', 'ListItemID'],
            Refiners: 'RefinableString15,RefinableString03',
            SortList: [{
                'Property': 'RefinableDate01',
                'Direction': '1'
            }],
            StartRow: startrow
        }).then(function(response) {

            response.PrimarySearchResults.map(function(item) {
                if (item.PublishingImage) {
                    item.ImageUrl = getImage(item.PublishingImage);
                }
                if (item.RefinableDate01) {

                    var artDate = new Date(item.RefinableDate01);
                    item.ArticleDate = moment(artDate).format('MMMM D, YYYY');
                }
            });
            deferred.resolve(response);
        });
        return deferred.promise;
    }

  

}]);