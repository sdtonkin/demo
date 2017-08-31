var ctrlName = 'NewsLandingCtrl';
var app = angular.module('compassionIntranet');
app.controller(ctrlName, ['$scope', '$location', 'newsService', 'taxonomyService', 'COM_CONFIG', function ($scope, $location, newsService, taxonomyService, COM_CONFIG) {
    var ctrl = this;
    ctrl.newsCategories = [];
    ctrl.eventCategories = [];
    ctrl.categories = [];
    ctrl.regions = [];
    ctrl.sortOptions = [
        { title: 'By Date' }
    ];
    ctrl.newsArticles = [];
    ctrl.events = [];
    ctrl.activeTab = 'news';

    this.$onInit = function () {
        getData();
        
    };

    function getData() {
        taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.newsTypeTermId).then(function (data) {
            console.log(data);
            ctrl.newsCategories = data;
            if (ctrl.activeTab == 'news') {
                ctrl.categories = data;
            }
        });
        taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.eventTypeTermId).then(function (data) {
            console.log(data);
            ctrl.eventCategories = data;
            if (ctrl.activeTab == 'events') {
                ctrl.categories = data;
            }
        });
        taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.locationTermId).then(function (data) {
            console.log(data);
            ctrl.regions = data;
        });
        newsService.getNews().then(function (data) {
            console.log(data);
            ctrl.newsArticles = data
        });
        newsService.getEvents().then(function (data) {
            console.log(data);
            ctrl.events = data
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