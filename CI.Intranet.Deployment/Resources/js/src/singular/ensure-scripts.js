(function () {
    var baseUrl = '/_catalogs/masterpage/Compassion/js/lib/',
        angular = 'angular.min.js',
        angularMap = 'angular.min.js.map';
    console.log(typeof angular == 'undefined');

    
    if (typeof angular == 'undefined') {
        document.write('<script type="text/javascript" src="' + baseUrl + angular + '" />');
    }
    
})();