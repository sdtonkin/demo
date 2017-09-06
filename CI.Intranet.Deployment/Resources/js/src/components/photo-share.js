var ctrlName = 'photoShareCtrl';
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
        var url = COM_CONFIG.rootWeb + '/_layouts/15/Upload.aspx?List=%7B7CC88BAC-9CC9-4457-A59C-51FF5A21838D%7D&RootFolder=%2Fsites%2Fstage%2FmissionPhotos&ContentTypeId=0x0101009148F5A04DDD49CBA7127AADA5FB792B00AADE34325A8B49CDA8BB4DB53328F21401006059AB8EDD2AB649BE422D937A86AE6B';
        if (ctrl.newFormUrl) url = newFormUrl;
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