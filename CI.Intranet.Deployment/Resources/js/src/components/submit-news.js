var ctrlName = 'submitNewsCtrl';
var app = angular.module('compassionIntranet');
app.controller(ctrlName, ['$scope', '$q', 'modalService', 'COM_CONFIG', function ($scope, $q, modalService, COM_CONFIG) {
    var ctrl = this;

    ctrl.displayNewStory = displayNewStory;

    this.$onInit = function displayNewStory() {
        var url = COM_CONFIG.rootWeb + '/news/Lists/Story%20Submissions/NewForm.aspx?Source=https%3A%2F%2Fcompassion%2Esharepoint%2Ecom%2Fsites%2Fstage%2Fnews%2FLists%2FStory%2520Submissions%2FAllItems%2Easpx&ContentTypeId=0x0100D3F82597B02474459BD7161C6EEE2709&RootFolder=';
        if (ctrl.newFormUrl) url = newFormUrl;
        var options = SP.UI.$create_DialogOptions();
        options.url = url;
        options.dialogReturnValueCallback = Function.createDelegate(null, null);

        SP.UI.ModalDialog.showModalDialog(options);
    }
}]).component('submitNews', {
    template: require('../../includes/Submit-News.html'),
    controller: ctrlName,
    controllerAs: 'ctrl'
});