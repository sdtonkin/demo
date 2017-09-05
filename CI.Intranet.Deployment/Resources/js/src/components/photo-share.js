var ctrlName = 'newsEventsBrowserCtrl';
var app = angular.module('compassionIntranet');
app.controller(ctrlName, ['$scope', '$q', '$location', 'photoService', 'COM_CONFIG', function ($scope, $q, $location, photoService, COM_CONFIG) {
    var ctrl = this;
    
    ctrl.displayNewPhotoForm = displayNewPhotoForm;

    this.$onInit = function () {
        photoService.getPhotos().then(function (data) {
            ctrl.photos = data;
        });
    };
    function displayNewPhotoForm() {
        var url = '/Lists/MissionPhotos/NewForm.aspx?IsDlg=1';
        if (newFormUrl) url = newFormUrl;
        var options = SP.UI.$create_DialogOptions();
        options.url = url;
        options.dialogReturnValueCallback = Function.createDelegate(null, null);

        SP.UI.ModalDialog.showModalDialog(options);
    }
}]).component('photoShare', {
    bindings: {
        pictureLimit: '@',
        newFormUrl: '@'
    },
    template: require('../../includes/Photo-Share.html'),
    controller: ctrlName,
    controllerAs: 'ctrl'
});