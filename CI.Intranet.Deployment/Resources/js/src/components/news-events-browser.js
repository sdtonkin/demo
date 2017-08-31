var ctrlName = 'newsEventsBrowserCtrl';
var app = angular.module('compassionIntranet');
app.controller(ctrlName, ['$scope', '$q', '$location', 'newsService', 'taxonomyService', 'COM_CONFIG', function ($scope, $q, $location, newsService, taxonomyService, COM_CONFIG) {
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
        var p1 = taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.newsTypeTermId);
        var p2 = taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.eventTypeTermId);
        var p3 = taxonomyService.getTermFromMasterTermsetByGuid(COM_CONFIG.termSets.locationTermId);
        var p4 = newsService.getNews();
        var p5 = newsService.getEvents();

        $q.all([p1, p2, p3, p4, p5]).then(function (data) {
            ctrl.newsCategories = data[0];
            ctrl.eventCategories = data[1];
            ctrl.regions = data[2];
            ctrl.newsArticles = data[3];
            ctrl.events = data[4];

            if (ctrl.activeTab == 'events') {
                ctrl.categories = d2;
            } else {
                ctrl.categories = d1;
            }

            //$scope.$apply();
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