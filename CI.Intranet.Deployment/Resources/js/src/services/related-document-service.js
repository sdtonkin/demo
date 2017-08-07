import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";

var myApp = angular.module('compassionIntranet');


myApp.service('relatedDocService', function($q, $http, COM_CONFIG) {

    const document = function(document) {
        let x = document.ContentType
        if (x.indexOf('Document') > 0) {
            //set base document content type
            contentType = " ContentTypeId:0x0101295D73ACDB7A4BAEBE6E712640858F91* ";
        }


        var defer = $q.defer();

        $pnp.sp.search({
            Querytext: '' + contentType + 'AND' + category + ' ',
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
                //filter out current document
                let documentTitle = document.Title;
                if (documentTitle != item.Title) return item;
            });
            //create array of objects
            items = items.map(createObject);

            defer.resolve(items);
        });
        return defer.promise;
    }

    const getDocument = function() {

        var defer = $q.defer();

        let documentTitle = $(".title").text();
        $pnp.sp.search({
            Querytext: 'Title= "' + documentTitle + '" ' + path + '',
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

                items.COM_DocumentType = items.RefinableString15;
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