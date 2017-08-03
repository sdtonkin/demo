import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";

var myApp = angular.module('compassionIntranet');


myApp.service('relatedNewsService', function($q, $http, COM_CONFIG) {

    const depNews = function(page) {
        let eventQuery = "";
        let contentType = "";
        let category = "";
        let x = page.ContentType
        if (x.indexOf('Article') > 0) {
            //set news content type
            contentType = " ContentTypeId:0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF3900242457EFB8B24247815D688C526CD44D0017899C3E9B390F4E9BD82B8F03AFD6E6* ";
            category = " RefinableString15: '" + page.newsCategory + "'";
        }

        //specify query variables
        let rootNews = " Path:" + _spPageContextInfo.siteAbsoluteUrl + "/news";

        var defer = $q.defer();

        pnp.sp.search({
            Querytext: '' + contentType + 'AND' + category + ' ' + rootNews + '',
            SelectProperties: ['RefinableString1', 'RefinableString00', 'RefinableDate00', 'RefinableDate01', 'RefinableDate02', 'Path', 'Title', 'ArticleByLineOWSTEXT', 'ContentType'],
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
            //create array of objects
            items = items.map(createObject);

            defer.resolve(items);
        });
        return defer.promise;
    }

    const getPage = function() {

        var defer = $q.defer();

        let pageTitle = $(".page-title").text();
        let rootNews = _spPageContextInfo.siteAbsoluteUrl + "/news";
        let path = " Path:" + "" + rootNews + "";
        pnp.sp.search({
            Querytext: 'Title= "' + pageTitle + '" ' + path + '',
            SelectProperties: ['RefinableString10', 'RefinableString09', 'RefinableString100', 'RefinableString13', 'Path', 'Title', 'ArticleByLineOWSTEXT', 'ContentType'],
            TrimDuplicates: 'false',
            RowLimit: 3,
            SortList: [{
                'Property': 'RefinableDate01',
                'Direction': '0'
            }]

        }).then(function(data) {

            var items = data.PrimarySearchResults[0];
            if (items.RefinableString15) {

                items.newsCategory = items.RefinableString15;
            }

            defer.resolve(items);
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