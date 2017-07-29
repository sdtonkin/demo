'use strict';
var myApp = angular.module('compassionIntranet');

myApp.factory('common', ['COM_CONFIG', function (COM_CONFIG) {
    return {
        existsInArray: function (item, list) {
            if (item === null || list === null) return false;
            var item = _.find(list, function (i) {
                return i.id == item.id;
            });
            return item != null;
        },
        existsIdInArray: function (id, list) {
            if (id === null || list === null) return false;
            var item = _.find(list, function (i) {
                return i.id == id;
            });
            return item != null;
        }
    };
}]);
