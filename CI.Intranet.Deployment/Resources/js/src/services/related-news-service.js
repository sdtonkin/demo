var myApp = angular.module('compassionIntranet');
myApp.service('relatedNewsService', function($q, $http, COM_CONFIG) {
    var ctrl = this;
    ctrl.getRelatedNews = getRelatedNews;
    const depNews = function(page) {
        let eventQuery = "";
        let contentType = "";
        let category = "";
        let x = page.ContentType
        if (x.indexOf('News Page') > 0) {
            //set news content type
            contentType = " ContentTypeId:" + COM_CONFIG.contentTypeIds.newsPage + "* ";
            if (page.newsType) {
                category = " RefinableString01: '" + page.newsType + "'";
            }
        }

        //specify query variables
        let rootNews = " Path:" + _spPageContextInfo.siteAbsoluteUrl + "/news";

        var defer = $q.defer();

        $pnp.sp.search({
            Querytext: '' + contentType + 'AND' + category + ' ' + rootNews + '',
            SelectProperties: ['PublishingImage', 'RefinableString01', 'RefinableString00', 'RefinableDate00', 'RefinableDate01', 'RefinableDate02', 'Path', 'Title', 'ArticleByLineOWSTEXT', 'ContentType'],
            TrimDuplicates: 'false',
            RowLimit: 3,
            SortList: [{
                'Property': 'RefinableDate01',
                'Direction': '1'
            }]

        }).then(function(data) {

            var items = data.PrimarySearchResults
            items = items.filter(function(item) {
                //filter out current page
                let pageTitle = page.Title;
                if (pageTitle != item.Title) return item;
            });

            item.map(function (item) {
                if (item.PublishingImage) {
                    item.ImageUrl = getImage(item.PublishingImage) + '?RenditionId=1';
                }
                if (item.RefinableDate01) {
                    var eventDate = new Date(item.RefinableDate01);
                    item.rawArticleDate = eventDate
                    item.articleDate = moment(eventDate).format('MMMM D, YYYY');
                }                
                if (item.RefinableString01) {
                    item.newsType = item.RefinableString01;
                }                
            });

            defer.resolve(items);
        });
        return defer.promise;
    }

    const getPage = function() {
        var defer = $q.defer();

        let listItemId = _spPageContextInfo.pageItemId;
        let web = new $pnp.Web(COM_CONFIG.newsWeb);

        web.lists.getByTitle('Pages').items
            .getById(listItemId)
            .get()
            .then(function (data) {
                data.map(function (item) {
                    if (item.RefinableString01) {
                        item.newsType = item.RefinableString01;
                    }
                    if (item.RefinableDate00) {
                        var artDate = new Date(item.RefinableDate00);
                        item.articleDate = moment(artDate).format('MMMM D, YYYY');
                        item.rawArticleDate = artDate;
                    }                
                });
                if (!COM_CONFIG.isProduction) { console.log('get page', data); }
                if (data.length > 0) {
                    defer.resolve(data.PrimarySearchResults[0]);
                }
                else {
                    defer.resolve(null);
                }
        });

        return defer.promise;
    }

    ctrl.getData = function() {

        var defer = $q.defer();
        getPage().then(function(page) {
            depNews(page).then(function(items) {

                defer.resolve(items);
            });

        });
        return defer.promise;
    }

    function getRelatedNewsByType(newsType) {
        var defer = $q.defer();

        let listItemId = _spPageContextInfo.pageItemId;
        let web = new $pnp.Web(COM_CONFIG.newsWeb);

        web.lists.getByTitle('Pages').items
            .filter('COM_NewsType eq ' + newsType)
            .top(3)
            .orderBy('COM_PublishDate', false)
            .get()
            .then(function (data) {
                data.map(function (item) {
                    if (item.RefinableString01) {
                        item.newsType = item.RefinableString01;
                    }
                    if (item.RefinableDate00) {
                        var artDate = new Date(item.RefinableDate00);
                        item.articleDate = moment(artDate).format('MMMM D, YYYY');
                        item.rawArticleDate = artDate;
                    }
                });
                if (!COM_CONFIG.isProduction) { console.log('getRelatedNewsByType', data); }
                if (data.length > 0) {
                    defer.resolve(data.PrimarySearchResults[0]);
                }
                else {
                    defer.resolve(null);
                }
            });

        return defer.promise;
    }
    function getRelatedNews(newsType, pageUrl, rowLimit) {
        var defer = $q.defer();

        $pnp.sp.search({
            Querytext: 'ContentTypeId:' + COM_CONFIG.contentTypeIds.newsPage + '* AND Path:"' + COM_CONFIG.rootWeb + '"',
            SelectProperties: ['PublishingImage', 'Id','RefinableString01', 'RefinableString00', 'RefinableDate00', 'RefinableDate01', 'RefinableDate02', 'Path', 'Title', 'ArticleByLineOWSTEXT', 'ContentType'],
            RefinementFilters: ['RefinableString01:equals("Country Office")'],
            RowLimit: (rowLimit == null ? 3 : rowLimit),
            TrimDuplicates: false,
            SortList: [{
                'Property': 'RefinableDate01',
                'Direction': '1'
            }]
        }).then(function (data) {
            var items = data.PrimarySearchResults
            items = items.filter(function (item) {
                //filter out current page
                if (pageUrl != item.Path) return item;
            });
            items.map(function (item) {
                if (item.PublishingImage) {
                    item.ImageUrl = getImage(item.PublishingImage) + '?RenditionId=1';
                }
                if (item.RefinableDate00) {
                    var eventDate = new Date(item.RefinableDate00);
                    item.rawArticleDate = eventDate
                    item.articleDate = moment(eventDate).format('MMMM D, YYYY');
                }
                if (item.RefinableString01) {
                    item.newsType = item.RefinableString01;
                }
            });
            if (!COM_CONFIG.isProduction) { console.log('getRelatedNews', items); }            
            defer.resolve(items);
        });
        return defer.promise;
    }
    function getImage(element) {
        var src = $(element).attr('src');
        if (src.indexOf('?') != -1)
            src = src.substring(0, src.indexOf('?'));
        return src;
    }
});