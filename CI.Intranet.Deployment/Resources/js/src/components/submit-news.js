var ctrlName = 'submitNewsCtrl';
var app = angular.module('compassionIntranet');
app.controller(ctrlName, ['$scope', '$q', 'modalService', 'COM_CONFIG', function ($scope, $q, modalService, COM_CONFIG) {
    var ctrl = this;

    ctrl.displayNewStory = displayNewStory;

    function displayNewStory() {
        var url = COM_CONFIG.rootWeb + '/news/Lists/Story%20Submissions/NewForm.aspx?Source=https%3A%2F%2Fcompassion%2Esharepoint%2Ecom%2Fsites%2Fstage%2Fnews%2FLists%2FStory%2520Submissions%2FAllItems%2Easpx&ContentTypeId=0x010085D9BC346FD84547A9D01C1DD1FED37400FB5D38A32B37AD4E8E9EE8565F7C11E7&RootFolder=';
        if (ctrl.newFormUrl) url = newFormUrl;
        var options = {};
        options.url = url;
        options.dialogReturnValueCallback = Function.createDelegate(null, null);

        SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
    }
}]).component('submitNews', {
    template: require('../../includes/Submit-News.html'),
    controller: ctrlName,
    controllerAs: 'ctrl'
});