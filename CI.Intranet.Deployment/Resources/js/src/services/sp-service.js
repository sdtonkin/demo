'use strict';
angular.module('compassionIntranet').service('spService', ['$http', '$q', 'COM_CONFIG', 'storage', 'common', function ($http, $q, COM_CONFIG, storage, common) {
    var ctrl = this;
    var siteKey = 'CI_PROJECT_SITE_LIST';

    // clear local storage if url param is detected
    common.checkForClearStatement('clearSiteKey', siteKey);
    // ensure Promise for pnp is loaded prior to using pnp module
    ES6Promise.polyfill();

    ctrl.getMySites = getMySites;
    function getMySites(siteCollectionUrl) {
        var defer = $q.defer();
        $pnp.sp.search({
            Querytext: 'path:' + siteCollectionUrl + '/*',
            TrimDuplicates: false,
            RowLimit: 100,
            RefinementFilters: ['contentclass:equals("STS_Web")'],
            //SelectProperties: ['Path', 'PublishingImage', 'SiteTitle', 'Title', 'ListItemID', 'RefinableDate00', 'RefinableString00', 'RefinableString01', 'RefinableString02'],
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
            });
            
            if (!COM_CONFIG.isProduction) { console.log('service sites', response.PrimarySearchResults); }
            
            defer.resolve(response.PrimarySearchResults);
        });

        return defer.promise;
    }

}]);