var myApp = angular.module('compassionIntranet');


myApp.service('employeeSpotlightService', function($q, $http, COM_CONFIG) {


    function getLocation() {
        var def = $q.defer();
        let loginName = "i:0#.f|membership|" + _spPageContextInfo.userLoginName;
        def.resolve($pnp.sp.profiles.getUserProfilePropertyFor(loginName, "SPS-Location"));
        return def.promise;

    }

    function getSpotlight(loc) {
        var def = $q.defer();
        let caml = "<GetListItems><Query><Where><And><Geq><FieldRef Name='COM_ExpirationDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + now + "</Value></Geq><And><Leq><FieldRef Name='COM_EventDate' /><Value IncludeTimeValue='TRUE' Type='DateTime'>" + now + "</Value></Leq><Or><Eq><FieldRef Name='COM_Location' /><Value Type='TaxonomyFieldType'>" + loc + "</Value></Eq><IsNull><FieldRef Name='COM_Location' /></IsNull></Or></And></And></Where></Query><ViewFields><FieldRef Name='COM_EventDate' /><FieldRef Name='COM_Location' /><FieldRef Name='ID' /><FieldRef Name='COM_EventType' /><FieldRef Name='COM_ExpirationDate' /></ViewFields><QueryOptions /></GetListItems>' + now + '</Value></Geq><Eq><FieldRef Name='COM_Location' /><Value Type='TaxonomyFieldType'>' + loc + '</Value></Eq></And></And></Where></Query><ViewFields><FieldRef Name='COM_EventType' /><FieldRef Name='COM_Location' /><FieldRef Name='ID' /></ViewFields><QueryOptions /></GetListItems>";
        let web = new $pnp.Web(COM_CONFIG.rootWeb);

        def.resolve(web.lists.getByTitle("Employee%20Spotlight").getItemsByCAMLQuery({ ViewXml: caml }));
        return def.promise;
    }

    this.getData = function (page) {
        try {
            var def = $q.defer();

            getLocation().then(function(loc) {

                getAlert(loc).then(function(items) {;
                    def.resolve(items[0]);

                });

            });
            return def.promise;
        }
        catch(ex) {
            console.error(e);
        }

    }
    
    this.getSpotlight = function () {
        try {
            return getData();
        }
        catch (ex) {
            console.error(ex);
        }
    }


});