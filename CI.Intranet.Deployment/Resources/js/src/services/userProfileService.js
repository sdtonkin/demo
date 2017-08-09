import pnp from "sp-pnp-js";

angular.module('compassionIntranet').service('userProfileService', function($http, $q) {
    return {
        getUserProfile: getUserProfile,
        getUserLocation: getUserLocation,
        getCurrentUserProfile: getCurrentUserProfile,
        getUserDepartment: getUserDepartment
    }

    function getCurrentUserProfile() {
        return pnp.sp.profiles.getPropertiesFor();
    }

    function getUserLocation() {

        var user = "i:0#.f|membership|" + _spPageContextInfo.userLoginName;
        return (pnp.sp.profiles.getUserProfilePropertyFor(user, "SPS-Location"))

    }

    function getUserDepartment() {

        var user = "i:0#.f|membership|" + _spPageContextInfo.userLoginName;
        return (pnp.sp.profiles.getUserProfilePropertyFor(user, "Department"))


    }

    function getUserProfile(emailArray) {
        var promiseArray = [];
        for (var i = 0; i < emailArray.length; i++) {
            //  console.log("Calling UserProfile for " + emailArray[i]);
            promiseArray.push(pnp.sp.profiles.getPropertiesFor("i:0#.f|membership|" + emailArray[i]));
        }
        //Since there aree multiple calls we need to push each of them to an array and return that array of promises
        //Promise.all will only resolve when all of the promises in the array are resolved.
        return Promise.all(promiseArray);
    }

});