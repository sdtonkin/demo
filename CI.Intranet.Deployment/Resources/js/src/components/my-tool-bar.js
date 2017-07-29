'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolbarCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'modalService', 'toolBarService', 'COM_CONFIG', function ($scope, common, modalService, toolBarService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;    
    var isToolbarDirty = false;

    ctrl.openModal = openModal;
    ctrl.closeModal = closeModal;
    ctrl.saveMyTools = saveMyTools;
    ctrl.enableSaveButton = function () { return !isToolbarDirty; };
    this.$onInit = function () {        
        toolBarService.getMyTools(userId).then(function (response) {
            $scope.myToolsFromDb = response;
            $scope.myTools = response;
        });
        toolBarService.getAllTools().then(function (response) {
            $scope.allTools = response;
        });
    };
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
    function saveMyTools() {
        var tools = $scope.myTools;
        var dbTools = $scope.myToolsFromDb;
        var toolsToAdd = _.where(tools, { id: -1 });
        var toolsToDelete = _.difference(dbTools, tools);

        for (var i = 0; i < toolsToAdd.length; i++) {
            var tool = toolsToAdd[i];
            toolBarService.addMyTool(userId, tool.toolId);
        }
        for (var i = 0; i < toolsToDelete.length; i++) {
            var tool = toolsToDelete[i];
            toolBarService.removeMyTool(tool.id);
        }
        $scope.myToolsFromDb = $scope.myTools;
        isToolbarDirty = false;
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
