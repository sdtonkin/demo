﻿'use strict';
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
        },
        getUrlParamByName: function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        isURL: function(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return pattern.test(str);
        }
        /*
        isLocalStorageSupported: function () {
            Modernizr.addTest('localstorage', function () {
                var mod = 'modernizr';
                try {
                    localStorage.setItem(mod, mod);
                    localStorage.removeItem(mod);
                    return true;
                } catch (e) {
                    return false;
                }
            });
        }
        */
    };
}]);