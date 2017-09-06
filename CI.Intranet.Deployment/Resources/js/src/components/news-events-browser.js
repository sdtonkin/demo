var ctrlName = 'newsEventsBrowserCtrl';
var app = angular.module('compassionIntranet');
app.controller(ctrlName, ['$scope', '$q', '$location', 'newsService', 'taxonomyService', 'yammerApiService', 'COM_CONFIG', function ($scope, $q, $location, newsService, taxonomyService, yammerApiService, COM_CONFIG) {
    var ctrl = this,
        masterArticles,
        masterEvents;
    ctrl.newsCategories = [];
    ctrl.eventCategories = [];
    ctrl.categories = [];
    ctrl.regions = [];
    ctrl.sortOptions = [
        { title: 'Newest First', direction: 'dsc' },
        { title: 'Oldest First', direction: 'asc' }
    ];
    ctrl.newsArticles = [];
    ctrl.events = [];
    ctrl.activeTab = 'news';
    ctrl.filterByCategory = filterByCategory;
    ctrl.filterByRegion = filterByRegion;
    ctrl.clearCategory = clearCategory;
    ctrl.clearRegion = clearRegion;
    ctrl.selectedRegion = '';
    ctrl.selectedCategory = '';
    ctrl.sortBy = sortBy;
    ctrl.goSearch = goSearch;
    $scope.searchTerm = '';

    this.$onInit = function () {
        getData();        
    };
    function goSearch() {
        if (ctrl.activeTab == 'events') {
            newsService.getEvents($scope.searchTerm).then(function (data) {
                masterEvents = data;
                ctrl.events = data;
            });
            ctrl.selectedRegion = '';
            ctrl.selectedCategory = '';
        } else {
            newsService.getNews($scope.searchTerm).then(function (data) {
                masterArticles = data;
                ctrl.newsArticles = data;
            });
            ctrl.selectedRegion = '';
            ctrl.selectedCategory = '';
        }
    }
    function sortBy(sort) {
        var articles = _.sortBy(masterArticles, 'ArticleDate');
        var events = _.sortBy(masterEvents, 'RawEventDate');
        if (sort.direction == 'asc') {
            ctrl.newsArticles = articles;
            ctrl.events = events;
        } else {
            ctrl.newsArticles = articles.reverse();
            ctrl.events = events.reverse();
        }

        var newSortOptions = _.reject(ctrl.sortOptions, function (s) {
            return s.title == sort.title;
        });

        newSortOptions.unshift(sort);
        ctrl.sortOptions = newSortOptions;
        $('#ci-filter-menu').removeClass('show');
    }
    function filterByCategory(category) {
        ctrl.selectedCategory = category;
        if (ctrl.activeTab == 'news') {
            ctrl.newsArticles = _.filter(masterArticles, function (a) {
                return a.NewsType == category.name;
            });
        } else {
            ctrl.events = _.filter(masterEvents, function (e) {
                return e.EventType == category.name;
            });
        }
    }
    function filterByRegion(region) {
        ctrl.selectedRegion = region;
        if (ctrl.activeTab == 'news') {
            ctrl.newsArticles = _.filter(masterArticles, function (a) {
                return a.LocationTag == region.name;
            });
            if (ctrl.newsArticles.length == 0) {
                ctrl.newsArticles = _.filter(masterArticles, function (a) {
                    return _.find(region.Nodes, function (n) {
                        return n.name == a.LocationTag;
                    });
                });
            }
        } else {
            ctrl.events = _.filter(masterEvents, function (e) {
                return e.LocationTag == region.name;
            });
            if (ctrl.events.length == 0) {
                ctrl.events = _.filter(masterEvents, function (a) {
                    return _.find(region.Nodes, function (n) {
                        return n.name == a.LocationTag;
                    });
                });
            }
        }
    }
    function clearCategory() {
        if (ctrl.selectedRegion != '') {
            if (ctrl.activeTab == 'news') {
                ctrl.newsArticles = _.filter(masterArticles, function (a) {
                    return a.LocationTag == ctrl.selectedRegion;
                });
            } else {
                ctrl.events = _.filter(masterEvents, function (e) {
                    return e.LocationTag == ctrl.selectedRegion;
                });
            }
        } else {
            if (ctrl.activeTab == 'news') {
                ctrl.newsArticles = masterArticles;
            } else {
                ctrl.events = masterEvents
            }
        }
    }
    function clearRegion() {
        if (ctrl.selectedCategory != '') {
            if (ctrl.activeTab == 'news') {
                ctrl.newsArticles = _.filter(masterArticles, function (a) {
                    return a.NewsType == ctrl.selectedCategory;
                });
            } else {
                ctrl.events = _.filter(masterEvents, function (e) {
                    return e.EventType == ctrl.selectedCategory;
                });
            }
        } else {
            if (ctrl.activeTab == 'news') {
                ctrl.newsArticles = masterArticles;
            } else {
                ctrl.events = masterEvents
            }
        }
    }
    function getData() {
        var p1 = taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.newsTypeTermId);
        var p2 = taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.eventTypeTermId);
        var p3 = taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.locationTermId);
        var p4 = newsService.getNews();
        var p5 = newsService.getEvents();

        $q.all([p1, p2, p3, p4, p5]).then(function (data) {
            console.log(data);
            ctrl.newsCategories = data[0];
            ctrl.eventCategories = data[1];
            ctrl.regions = data[2];
            masterArticles = data[3];
            ctrl.newsArticles = data[3];
            masterEvents = data[4];
            ctrl.events = data[4];

            if (ctrl.activeTab == 'events') {
                ctrl.categories = ctrl.eventCategories;
            } else {
                ctrl.categories = ctrl.newsCategories;
            }

        });
    }
    
}]).component('newsEventsBrowser', {
    bindings: {
        default: '@'
    },
    template: require('../../includes/News-Events-Browser.html'),
    controller: ctrlName,
    controllerAs: 'ctrl'
});