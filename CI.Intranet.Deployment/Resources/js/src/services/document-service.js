﻿import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/webs";
'use strict';
angular.module('compassionIntranet').service('documentService', ['$http', '$q', 'COM_CONFIG', function ($http, $q, COM_CONFIG) {
    function getMyDocuments(user) {
        var defer = $q.defer();
        pnp.sp.search({
            Querytext: 'Author: "' + user + '" OR ModifiedBy: "' + user + '"',
            RowLimit: 10,
            EnableInterleaving: true,
            RefinementFilters: ['fileExtension:equals("txt")'],
            SelectProperties: ['Title', 'FileDirRef', 'EncodedAbsUrl', 'Author', 'ModifiedBy']
        }).then(function(results) {
            console.log(results);
        });

        return defer.promise;
    }

    this.getMyDocuments = function (user) {
        var defer = $q.defer();
        getMyDocuments(user).then(function (results) {
            defer.resolve(results);
        });

        return defer.promise;
    };
}]);