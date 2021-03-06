﻿var ctrlName = 'newsEventsBrowserCtrl';
var app = angular.module('compassionIntranet');
app.controller(ctrlName, ['$scope', '$q', '$location', 'newsService', 'taxonomyService', 'yammerApiService', 'pagerService', 'COM_CONFIG', 'common', function ($scope, $q, $location, newsService, taxonomyService, yammerApiService, pagerService, COM_CONFIG, common) {
    var ctrl = this,
        masterArticles,
        masterEvents;
    ctrl.newsPager = {};
    ctrl.eventsPager = {};
    ctrl.setNewsPage = setNewsPage;
    ctrl.setEventsPage = setEventsPage;
    ctrl.newsItems = [];
    ctrl.eventItems = [];

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
    ctrl.checkForGoSearch = checkForGoSearch;
    $scope.searchTerm = '';
    $scope.selectedCategoryTitle = 'category';
    $scope.selectedRegionTitle = 'region';

    this.$onInit = function () {
        getData();        
    };
    function checkForGoSearch($event) {
        if ($event.keyCode === 13) {
            goSearch();
        }
    }
    function goSearch() {
        if (ctrl.activeTab == 'events') {
            newsService.getEvents($scope.searchTerm).then(function (data) {
                masterEvents = data;
                ctrl.events = data;
                ctrl.eventItems = data;
                ctrl.setEventsPage(1);                
            });
            ctrl.selectedRegion = '';
            ctrl.selectedCategory = '';
        } else {
            newsService.getNews($scope.searchTerm).then(function (data) {
                masterArticles = data;
                ctrl.newsArticles = data;
                ctrl.newsItems = data;
                ctrl.setNewsPage(1);
            });
            ctrl.selectedRegion = '';
            ctrl.selectedCategory = '';
        }        
    }
    function sortBy(sort) {
        var articles = _.sortBy(masterArticles, 'RawArticleDate');
        var events = _.sortBy(masterEvents, 'RawEventDate');
        if (sort.direction == 'asc') {
            ctrl.newsArticles = articles;
            ctrl.newsItems = articles;
            ctrl.events = events;
            ctrl.eventItems = events;
        } else {
            ctrl.newsArticles = articles.reverse();
            ctrl.newsItems = articles.reverse();
            ctrl.events = events.reverse();
            ctrl.eventItems = events.reverse();
        }

        var newSortOptions = _.reject(ctrl.sortOptions, function (s) {
            return s.title == sort.title;
        });

        newSortOptions.unshift(sort);
        ctrl.sortOptions = newSortOptions;
        ctrl.setEventsPage(1);
        ctrl.setNewsPage(1);
        $('#ci-filter-menu').removeClass('show');
    }
    function filterByCategory(category) {
        ctrl.selectedCategory = category;
        $scope.selectedCategoryTitle = category.Key;
        if (ctrl.activeTab == 'news') {
            ctrl.newsArticles = _.filter(masterArticles, function (a) {
                return a.NewsType == category.name;
            });
            ctrl.newsItems = ctrl.newsArticles;
            ctrl.setNewsPage(1);
        } else {
            ctrl.events = _.filter(masterEvents, function (e) {
                return e.EventType == category.name;
            });
            ctrl.eventItems = ctrl.events;
            ctrl.setEventsPage(1);
        }
    }
    function filterByRegion(region) {
        ctrl.selectedRegion = region;
        $scope.selectedRegionTitle = region.Key;
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
            ctrl.newsItems = ctrl.newsArticles;
            ctrl.setNewsPage(1);
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
            ctrl.eventItems = ctrl.events;
            ctrl.setEventsPage(1);
        }
    }
    function filterByGroup(group) {
        ctrl.newsArticles = _.filter(masterArticles, function (a) {
            return a.Group == group.name;
        });
        ctrl.events = _.filter(masterEvents, function (e) {
            return e.Group == group.name;
        });
        ctrl.newsItems = ctrl.newsArticles;
        ctrl.setNewsPage(1);
        ctrl.eventItems = ctrl.events;
        ctrl.setEventsPage(1);
    }
    function clearCategory() {
        if (ctrl.activeTab == 'news') {
            ctrl.newsArticles = masterArticles;
            ctrl.newsItems = masterArticles;
            ctrl.setNewsPage(1);
        } else {
            ctrl.events = masterEvents
            ctrl.eventItems = ctrl.events;
            ctrl.setEventsPage(1);
        }        
        ctrl.selectedCategory = '';
        $scope.selectedCategoryTitle = 'category';
    }
    function clearRegion() {
        if (ctrl.activeTab == 'news') {
            ctrl.newsArticles = masterArticles;
            ctrl.newsItems = masterArticles;
            ctrl.setNewsPage(1);
        } else {
            ctrl.events = masterEvents;
            ctrl.eventItems = ctrl.events;
            ctrl.setEventsPage(1);
        }
        ctrl.selectedRegion = '';
        $scope.selectedRegionTitle = 'region';
    }
    function getData() {
        var p1 = taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.newsTypeTermId);
        var p2 = taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.eventTypeTermId);
        var p3 = taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.locationTermId);
        var p4 = newsService.getNews();
        var p5 = newsService.getEvents();

        $q.all([p1, p2, p3, p4, p5]).then(function (data) {
            if (!COM_CONFIG.isProduction) { console.log('news and events', data); }
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
            checkForNewsTypeInUrl();
            ctrl.setEventsPage(1);
            ctrl.setNewsPage(1);
        });
    }
    function setNewsPage(page) {
        if (page < 1 || page > ctrl.newsPager.totalPages) {
            return;
        }

        // get pager object from service
        ctrl.newsPager = pagerService.getPager(ctrl.newsArticles.length, page);

        // get current page of items
        ctrl.newsItems = ctrl.newsArticles.slice(ctrl.newsPager.startIndex, ctrl.newsPager.endIndex + 1);
    }
    function setEventsPage(page) {
        if (page < 1 || page > ctrl.eventsPager.totalPages) {
            return;
        }

        // get pager object from service
        ctrl.eventsPager = pagerService.getPager(ctrl.events.length, page);

        // get current page of items
        ctrl.eventItems = ctrl.events.slice(ctrl.eventsPager.startIndex, ctrl.eventsPager.endIndex + 1);
    }
    function checkForNewsTypeInUrl() {
        var newsType = common.getUrlParamByName('newstype');
        var location = common.getUrlParamByName('location');
        var group = common.getUrlParamByName('group');
        var activeTab = common.getUrlParamByName('activeTab');

        if (activeTab != '')
            ctrl.activeTab = activeTab;

        if (newsType != '') {
            var type = {};
            type.name = newsType;
            filterByCategory(type);
        } else if (location != '') {
            var type = {};
            type.name = location;
            filterByRegion(type);
        } else if (group != '') {
            var type = {};
            type.name = group;
            filterByGroup(type);
        }        
    }
}]).component('newsEventsBrowser', {
    bindings: {
        default: '@'
    },
    template: require('../../includes/News-Events-Browser.html'),
    controller: ctrlName,
    controllerAs: 'ctrl'
});