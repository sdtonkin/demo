var myApp = angular.module('compassionIntranet');
myApp.service('relatedNewsService', function($q, $http, COM_CONFIG) {

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
            SelectProperties: ['RefinableString01', 'RefinableString00', 'RefinableDate00', 'RefinableDate01', 'RefinableDate02', 'Path', 'Title', 'ArticleByLineOWSTEXT', 'ContentType'],
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

            defer.resolve(items);
        });
        return defer.promise;
    }

    const getPage = function() {

        var defer = $q.defer();

        let pageTitle = $(".news-title-block > p.card-text").text();
        let rootNews = _spPageContextInfo.siteAbsoluteUrl + "/news";
        let path = " Path:" + "" + rootNews + "";
        $pnp.sp.search({
            Querytext: 'Title= "' + pageTitle + '" ' + path + '',
            SelectProperties: ['RefinableString01', 'RefinableString09', 'RefinableString100', 'RefinableString13', 'RefinableDate00', 'Path', 'Title', 'ArticleByLineOWSTEXT', 'ContentType'],
            TrimDuplicates: 'false',
            RowLimit: 3,
            SortList: [{
                'Property': 'RefinableDate01',
                'Direction': '0'
            }]

        }).then(function(data) {
            data.PrimarySearchResults.map(function (item) {
                if (item.RefinableString01) {
                    item.newsType = item.RefinableString01;
                }
                if (item.RefinableDate00) {
                    var artDate = new Date(item.RefinableDate00);
                    item.articleDate = moment(artDate).format('MMMM D, YYYY');
                    item.rawArticleDate = artDate;
                }
                
            });
            console.log(data);
            if (data.PrimarySearchResults.length > 0) {
                defer.resolve(data.PrimarySearchResults[0]);
            }
            else {
                defer.resolve(null);
            }
            
        });

        return defer.promise;
    }

    this.getData = function() {

        var defer = $q.defer();
        getPage().then(function(page) {
            depNews(page).then(function(items) {

                defer.resolve(items);
            });

        });
        return defer.promise;
    }
});