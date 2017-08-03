var ctrlName = "quickLinksCtrl";
import pnp from "sp-pnp-js";
import moment from "moment";

angular.module('discoverIntranet').controller(ctrlName, ['$scope', 'listService', 'DISCOVER_CONFIG', function($scope, listService, DISCOVER_CONFIG) {
    var cacheObj = pnp.storage.local;
    // if (!DISCOVER_CONFIG.useCaching) {
    //     cacheObj.delete(ctrlName);
    // }
    let now = moment();
    let expire = pnp.util.dateAdd(now, "minute", 5);
    cacheObj.getOrPut(ctrlName, listService.getMyLinks, expire).then(function(news) {
        $scope.news = news;
    });

}]).component('quickLinks', {
    template: require("./quickLinks.html"),
    controller: ctrlName,
    controlleras: 'ctrl'
});