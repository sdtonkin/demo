'use strict'

angular.module('compassionIntranet').service('newsService', ['$q', '$http', 'COM_CONFIG', function($q, $http, COM_CONFIG) {
    var ctrl = this;
    ctrl.getNews = getNews;
    ctrl.getEvents = getEvents;
    ES6Promise.polyfill();

    function getNews(searchTerm) {
        var defer = $q.defer();
        $pnp.sp.search({
            Querytext: 'Path:' + COM_CONFIG.newsWeb + ' AND ContentTypeId:' + COM_CONFIG.contentTypeIds.newsPage + '*' + (searchTerm == null ? '' : ' AND ' + searchTerm),
            SelectProperties: ['ContentType12', 'Path', 'PublishingImage', 'SiteTitle', 'Title', 'ListItemID', 'RefinableDate00', 'RefinableString00', 'RefinableString01', 'RefinableString02', 'RefinableString04'],
            TrimDuplicates: false,
            RowLimit: 100,
            SortList: [{
                'Property': 'RefinableDate01',
                'Direction': '1'
            }],
        }).then(function (response) {            
            response.PrimarySearchResults.map(function (item) {
                if (item.PublishingImage) {
                    item.ImageUrl = getImage(item.PublishingImage) + '?RenditionId=1';
                }
                if (item.RefinableDate00) {
                    var artDate = new Date(item.RefinableDate00);
                    item.ArticleDate = moment(artDate).format('MMMM D, YYYY');
                    item.RawArticleDate = artDate;
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
            var results = _.sortBy(response.PrimarySearchResults, 'RawArticleDate');
            console.log('news', results);
            defer.resolve(results.reverse());
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
            Querytext: 'Path:' + COM_CONFIG.newsWeb + ' AND ContentTypeId:' + COM_CONFIG.contentTypeIds.event + '*' + (searchTerm == null ? '' : ' AND ' + searchTerm),
            SelectProperties: ['Path', 'Title', 'Location', 'RefinableDate00', 'RefinableDate01', 'RefinableDate02', 'RefinableString00', 'RefinableString01', 'RefinableString02'],
            TrimDuplicates: false,
            RowLimit: 100,
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
}]);