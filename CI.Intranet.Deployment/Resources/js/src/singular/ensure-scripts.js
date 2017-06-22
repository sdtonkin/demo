(function () {
    var baseUrl = '/_catalogs/masterpage/Compassion/js/lib/',
        angular = 'angular.min.js',
        angularMap = 'angular.min.js.map';

    if (typeof window.angular == 'undefined') {
        document.write(unescape('%3Cscript+type%3D%22text%2Fjavascript%22+src%3D%22' + baseUrl + angular + '%22%3E%3C%2Fscript%3E+'));
        document.write(unescape('%3Cscript+type%3D%22text%2Fjavascript%22+src%3D%22' + baseUrl + angularMap + '%22%3E%3C%2Fscript%3E+'));
    }
})();