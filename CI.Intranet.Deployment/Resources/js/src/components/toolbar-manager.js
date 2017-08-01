'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'toolbarManagerCtrl';

myApp.controller(controllerName, ['$scope', 'common', 'modalService', 'appsService', 'bookmarkService', 'COM_CONFIG', function ($scope, common, modalService, appsService, bookmarkService, COM_CONFIG) {
    var ctrl = this;
    var userId = _spPageContextInfo.userId;
    ctrl.isToolbarDirty = false;

    $scope.$parent.$watch('ctrl.myTools', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        ctrl.myTools = newVal;
        ctrl.myToolsFromDb = scope.ctrl.myToolsFromDb;
        getSortOrderLimits();
    });
    $scope.$parent.$watch('ctrl.myBookmarks', function (newVal, oldVal, scope) {
        if (newVal == null) return;
        ctrl.myBookmarks = newVal;
        ctrl.myBookmarksFromDb = scope.ctrl.myBookmarksFromDb;
    });
    ctrl.newBookmark = {};
    ctrl.newBookmark.url = '';
    ctrl.newBookmark.title = '';
    ctrl.openModal = openModal;
    ctrl.closeModal = closeModal;
    ctrl.saveMyTools = saveMyTools;
    ctrl.openManageModal = openManageModal;
    ctrl.saveMyToolsSortOrder = saveMyToolsSortOrder;
    ctrl.updateSortOrder = updateSortOrder;
    ctrl.saveMyBookmark = saveMyBookmark;
    ctrl.enableAddNew = false;
    ctrl.addMyBookmark = function () {
        ctrl.enableAddNew = true;        
    };
    ctrl.enableSaveButton = function () {
        if (ctrl.isToolbarDirty)
            $scope.systemMessage = '';
        return !ctrl.isToolbarDirty;
    };
    
    this.$onInit = function () {
        ctrl.myTools = $scope.$parent.ctrl.myTools;
        appsService.getAllTools().then(function (response) {
            ctrl.allTools = response;
        });
    };
    $scope.myToolsSortList = [];
    $scope.existsToolMyTools = function (toolId) {
        if (!toolId) return false;
        var item = _.find(ctrl.myTools, function (i) {
            return i.toolId == toolId;
        });
        return item != null;
    };
    $scope.toggleSelection = function (id) {
        ctrl.isToolbarDirty = true;
        var item = _.find(ctrl.myTools, function (i) {
            return i.toolId == id;
        });
        if (item == null) {
            var tool = _.find(ctrl.allTools, function (i) {
                return i.id == id;
            });
            tool.toolId = tool.id;
            tool.id = -1;
            ctrl.myTools.push(tool);
        }
        else {
            var currentTools = ctrl.myTools;
            ctrl.myTools = _.without(currentTools, _.findWhere(currentTools, {
                toolId: id
            }));
        }
    };
    
    
    function updateSortOrder(tool, oldOrder) {
        ctrl.isToolbarDirty = true;
        var tools = ctrl.myTools;
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
        ctrl.myTools = _.sortBy(tools, 'sortOrder');
    }
    function saveMyToolsSortOrder() {
        for (var i = 0; i < ctrl.myTools.length; i++) {
            var tool = ctrl.myTools[i];
            appsService.updateUserTool(tool);
        }
        ctrl.myToolsFromDb = ctrl.myTools;
        ctrl.isToolbarDirty = false;
        ctrl.systemMessage = 'Success';
    }
    function saveMyBookmark() {
        var title = ctrl.newBookmark.title;
        var url = ctrl.newBookmark.url;
        bookmarkService.addMyBookmark(userId, title, url).then(function (data) {
            ctrl.enableAddNew = false;
            ctrl.isToolbarDirty = false;
            ctrl.systemMessage = 'Success adding bookmark';
            var newBookmark = {};
            newBookmark.title = title;
            newBookmark.url = url;
            $scope.$parent.ctrl.myBookmarks.push(newBookmark);
        });
        
    }
    function saveMyTools() {
        var tools = ctrl.myTools;
        var dbTools = ctrl.myToolsFromDb;
        var toolsToAdd = _.where(tools, { id: -1 });
        var fullTools = _.filter(tools, function (t) { return t.id != -1; });
        var toolsToDelete = _.difference(fullTools, tools);

        for (var i = 0; i < toolsToAdd.length; i++) {
            var tool = toolsToAdd[i];
            appsService.addMyTool(userId, tool.toolId);
        }
        for (var i = 0; i < toolsToDelete.length; i++) {
            var tool = toolsToDelete[i];
            appsService.removeMyTool(tool.id);
        }
        appsService.getMyTools(userId).then(function (response) {
            ctrl.myToolsFromDb = response;
            ctrl.myTools = angular.copy(response);
            getSortOrderLimits();
            ctrl.isToolbarDirty = false;
            ctrl.systemMessage = 'Success';
        });
    }
    function getSortOrderLimits() {
        if (ctrl.myTools == null) return;
        var myToolsCount = ctrl.myTools.length;
        var response = [];
        for (var i = 1; i <= myToolsCount; i++) {
            response.push(i);
        }
        $scope.myToolsSortList = response;
    }
    function openManageModal() {
        var selectedTablId = $scope.$parent.ctrl.selectedTabId;
        modalService.Open(selectedTablId + '-manage');
    }
    function openModal(id) {
        modalService.Open(id);
    }
    function closeModal(id) {
        modalService.Close(id);
    }
}]).component('toolbarManager', {
    template: require('../../includes/Toolbar-Manager.html'),
    controller: controllerName,
    controllerAs: 'ctrl',
    require: {
        parent: '^myToolbar'
    },
});
