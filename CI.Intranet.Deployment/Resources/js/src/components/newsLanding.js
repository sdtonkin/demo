// import pnp from "sp-pnp-js";
var ctrlName = 'NewsLandingCtrl';
var app = angular.module('compassionIntranet');
app.controller(ctrlName, ['$scope', '$location', 'newsService', 'taxonomyService', 'COM_CONFIG', function($scope, $location, newsService, taxonomyService, COM_CONFIG) {
    var ctrl = this;
    // var cacheObj = pnp.storage.local;
    //var _categories, _locations;
    var parameters = $location.search();
    $scope.searchTerm = '';
    $scope.news = [];
    $scope.startRow = 0;
    $scope.categoryActive = $scope.locationActive = false;
    if (parameters.location) {
        $scope.selectedLocation = parameters.location;
    } else {
        if (COM_CONFIG.rootWeb.toLowerCase() + "/news" === bones.web.url.toLowerCase()) { //On main news landing site
            $scope.selectedLocation = "All";
        } else {
            $scope.selectedLocation = "";
        }
    }
    $scope.selectedCategory = parameters.category ? parameters.category : '';


    taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.locationTermId).then(function(response) {
        console.log('location terms');
        console.dir(response);
        $scope.allLocations = response.map(function(item) {
            return item.Key;
        });
        if (!parameters.category) { //If category is already set locations will come from search call
            $scope.locations = $scope.allLocations;
        }
    });


    $scope.setTab = function(newTab) {
        if ($scope.tab !== newTab) {
            $scope.selectedCategory = '';
            if (newTab === 1) {
                $scope.getNewsArticles(false);
                getCategoryTerms(COM_CONFIG.termSets.newsCategoryTermId);
                $scope.searchText = "Search News";
            } else {
                $scope.getEvents(false);
                getCategoryTerms(COM_CONFIG.termSets.eventCategoryTermId);
                $scope.searchText = "Search Events";
            }
        }
        $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum) {
        return $scope.tab === tabNum;
    };

    $scope.search = function() {
        if ($scope.tab === 1) {
            $scope.getNewsArticles(false);
        } else {
            $scope.getEvents(false);
        }
    };

    $scope.getNewsArticles = function(loadMore) {
        //$scope.news = null;
        var me = this;
        $scope.loading = true;
        var start = 0;
        if (loadMore) { start = $scope.startRow; }
        newsService.getLandingNews($scope.selectedLocation, $scope.selectedCategory, $scope.searchTerm, start).then(function(news) {
            console.log("News:", news);
            if (loadMore) {
                $scope.news = $scope.news.concat(news.PrimarySearchResults);
            } else {
                $scope.news = news.PrimarySearchResults;
            }
            if ($scope.selectedLocation || $scope.searchTerm) {
                $scope.categories = getRefinementResults(news, "RefinableString15");
            } else {
                $scope.categories = $scope.allCategories;
            }
            if ($scope.selectedCategory || $scope.searchTerm) {
                $scope.locations = getRefinementResults(news, "RefinableString03");
            } else {
                $scope.locations = $scope.allLocations;
            }
            $scope.totalRows = news.TotalRows;
            $scope.startRow = loadMore ? $scope.startRow + 10 : 10;
            $scope.loading = false;
            //$scope.$apply();
        });
    };

    function getRefinementResults(results, managedProperty) {
        var returnedRefiners;
        if (results.RawSearchResults && results.RawSearchResults.PrimaryQueryResult &&
            results.RawSearchResults.PrimaryQueryResult.RefinementResults &&
            results.RawSearchResults.PrimaryQueryResult.RefinementResults.Refiners &&
            results.RawSearchResults.PrimaryQueryResult.RefinementResults.Refiners.length > 0) {

            var refiners = results.RawSearchResults.PrimaryQueryResult.RefinementResults.Refiners;
            returnedRefiners = refiners.filter(function(item) {
                return item.Name === managedProperty;
            });
            if (returnedRefiners && returnedRefiners[0] && returnedRefiners[0].Entries && returnedRefiners[0].Entries.length > 0) {
                var test = returnedRefiners[0].Entries.map(function(item) {
                    return item.RefinementName;
                });

                return test;
            } else {
                return [];
            }
        }
    }

   

}]).component('newsLanding', {
    bindings: {
        default: '@'
    },
    template: require('../../includes/newsLandingResults.html'),
    controller: ctrlName,
    controllerAs: 'ctrl'
}).directive('searchEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.searchEnter);
                });

                event.preventDefault();
            }
        });
    };
});