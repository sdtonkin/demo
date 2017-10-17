var ctrlName = 'photoShareCtrl';
var app = angular.module('compassionIntranet');
app.controller(ctrlName, ['$scope', '$q', '$location', 'photoService', 'COM_CONFIG', function ($scope, $q, $location, photoService, COM_CONFIG) {
    var ctrl = this;
    
    ctrl.displayNewPhotoForm = displayNewPhotoForm;


    this.$onInit = function () {
        $scope.viewAllUrl = ctrl.viewAllPhotosUrl;
        $scope.isLowBandwidth = window.lowBandwidth;
        if (window.lowBandwidth) return;
        photoService.getPhotos().then(function (data) {
            ctrl.photos = data;
        });
    };
    function displayNewPhotoForm() {
        var url = COM_CONFIG.rootWeb + '/_layouts/15/Upload.aspx?List=%7B729A43A8-8F26-43BB-8D73-EFA69869C460%7D&RootFolder=%2FmissionPhotos&ContentTypeId=0x0101009148F5A04DDD49CBA7127AADA5FB792B00AADE34325A8B49CDA8BB4DB53328F21401003A0E2280F0C17E429BC83C21EA24D44F';
        if (ctrl.newFormUrl) url = newFormUrl;
        var options = {};
        options.url = url;
        options.dialogReturnValueCallback = Function.createDelegate(null, null);

        SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
    }
}]).component('photoShare', {
    bindings: {
        pictureLimit: '@',
        newFormUrl: '@',
        viewAllPhotosUrl: '@'
    },
    template: require('../../includes/Photo-Share.html'),
    controller: ctrlName,
    controllerAs: 'ctrl'

});