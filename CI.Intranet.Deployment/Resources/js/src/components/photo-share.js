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
        var url = COM_CONFIG.rootWeb + COM_CONFIG.missionPhotoUpload;
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