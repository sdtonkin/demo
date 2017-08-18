'use strict'

angular.module('compassionIntranet').service('newsService', ['$q', '$http', 'COM_CONFIG', function($q, $http, COM_CONFIG) {



    this.getLandingNews = function(location, category, queryTerm, startrow) {
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