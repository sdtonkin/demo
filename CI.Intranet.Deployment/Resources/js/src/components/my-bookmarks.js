'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'bookmarkCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'modalService', 'bookmarkService', 'COM_CONFIG', function ($scope, common, modalService, bookmarkService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;    
    var isToolbarDirty = false;

    ctrl.openModal = openModal;
    ctrl.closeModal = closeModal;
    ctrl.saveMyTools = saveMyTools;
    ctrl.enableSaveButton = function () {
        if (isToolbarDirty)
            $scope.systemMessage = '';
        return !isToolbarDirty;
    };
    ctrl.saveMyToolsSortOrder = saveMyToolsSortOrder;
    ctrl.updateSortOrder = updateSortOrder;
    this.$onInit = function () {
        $("#ci-toolbar").tabs();
        toolBarService.getMyTools(userId).then(function (response) {
            $scope.myToolsFromDb = response;
            $scope.myTools = angular.copy(response);
            getSortOrderLimits();
        });
        toolBarService.getAllTools().then(function (response) {
            $scope.allTools = response;
        });        
    };
    $scope.myToolsSortList = [];
    $scope.existsToolMyTools = function (toolId) {
        if (!toolId) return false;
        var item = _.find($scope.myTools, function (i) {
            return i.toolId == toolId;
        });
        return item != null;
    };
    $scope.toggleSelection = function (id) {
        isToolbarDirty = true;
        var item = _.find($scope.myTools, function (i) {
            return i.toolId == id;
        });
        if (item == null) {
            var tool = _.find($scope.allTools, function (i) {
                return i.id == id;
            });
            tool.toolId = tool.id;
            tool.id = -1;
            $scope.myTools.push(tool);
        }
        else {
            var currentTools = $scope.myTools;
            $scope.myTools = _.without(currentTools, _.findWhere(currentTools, {
                toolId: id
            }));
        }
    };
    $scope.saveMyTools = saveMyTools;
    function updateSortOrder(tool, oldOrder) {
        isToolbarDirty = true;
        var tools = $scope.myTools;
        var newOrder = tool.sortOrder;
        if (oldOrder < newOrder) {
            for (var i = oldOrder - 1; i < newOrder; i++) {
                var t = tools[i];
                if (i == oldOrder - 1) {
                    tools[i].sortOrder = tool.sortOrder;
                }
                else if (i == newOrder - 1) {
                    tools[i].sortOrder = t.sortOrder - 1
                }
                else {
                    tools[i].sortOrder = t.sortOrder - 1;
                }
            }
        }
        else if (newOrder < oldOrder) {
            for (var i = newOrder - 1; i < oldOrder; i++) {
                var t = tools[i];
                if (i == newOrder - 1) {
                    tools[i].sortOrder = t.sortOrder + 1;
                }
                else if (i == oldOrder - 1) {
                    tools[i].sortOrder = tool.sortOrder;
                }
                else {
                    tools[i].sortOrder = t.sortOrder + 1;
                }
            }
        }
        $scope.myTools = _.sortBy(tools, 'sortOrder');
    }
    function saveMyToolsSortOrder() {
        for (var i = 0; i < $scope.myTools.length; i++) {
            var tool = $scope.myTools[i];
            toolBarService.updateUserTool(tool);
        }
        $scope.myToolsFromDb = $scope.myTools;
        isToolbarDirty = false;
        $scope.systemMessage = 'Success';
    }
    function saveMyTools() {
        var tools = $scope.myTools;
        var dbTools = $scope.myToolsFromDb;
        var toolsToAdd = _.where(tools, { id: -1 });
        var fullTools = _.filter(tools, function (t) { return t.id != -1; });
        var toolsToDelete = _.difference(fullTools, tools);

        for (var i = 0; i < toolsToAdd.length; i++) {
            var tool = toolsToAdd[i];
            toolBarService.addMyTool(userId, tool.toolId);
        }
        for (var i = 0; i < toolsToDelete.length; i++) {
            var tool = toolsToDelete[i];
            toolBarService.removeMyTool(tool.id);
        }
        toolBarService.getMyTools(userId).then(function (response) {
            $scope.myToolsFromDb = response;
            $scope.myTools = angular.copy(response);
            getSortOrderLimits();
            isToolbarDirty = false;
            $scope.systemMessage = 'Success';
        });
    }
    function getSortOrderLimits() {
        var myToolsCount = $scope.myTools.length;
        var response = [];
        for (var i = 1; i <= myToolsCount; i++) {
            response.push(i);
        }
        $scope.myToolsSortList = response;
    }
    function openModal(id) {
        modalService.Open(id);
    }
    function closeModal(id) {
        modalService.Close(id);
    }
}]).component('myToolBar', {
    template: require('../../includes/Tool-Bar.html'),
    controller: controllerName,
    controllerAs: 'ctrl'
});
