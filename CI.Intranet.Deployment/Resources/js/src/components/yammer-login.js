'use strict';
var ctrlName = "yammerLoginController";
var myApp = angular.module('compassionIntranet');

myApp.controller(ctrlName, function ($scope, $q) {

    // try to get yammer token
    //var yammerToken = localStorage.getItem("yammer_token");
    var ctrl = this;
    var profileUpdated = false;

    ES6Promise.polyfill();

    this.$onInit = function () {
        ctrl.checkForAuthToken().then(function (yammerToken){
            // if we have a yammer token, tell yam that we should use that token for all requests
            if (yammerToken != null && yammerToken != "") {
                yam.platform.setAuthToken(yammerToken, function (response) {
                    console.log("Yammer -> setAuthToken finished")
                });
                // call getLoginStatus to validate the token
                yam.getLoginStatus(function (response) {
                    if (response.authResponse) {
                        // if the token is bad / outdated, it may return an OK response but with an undefined token
                        if (response.access_token.token == "undefined") {
                            console.log("Yammer -> token is bad, clearing and logging in again.");
                            // the token is bad somehow.
                            //localStorage.removeItem("yammer_token");
                            ctrl.doLogin();
                            return;
                        }
                        // console.log("Yammer -> logged in");
                        yam.platform.setAuthToken(response.access_token.token, function (response) {
                            // console.log("Yammer -> setAuthToken finished");
                            ctrl.setUserProfileProperty(yammerToken).then(function(){
                                localStorage.removeItem("yammer_token");
                                localStorage.setItem("yammer_token", response.access_token.token);
                            });

                            //console.log(response);
                        });
                    } 
                    else {
                        console.log("Yammer -> not logged in.  Calling yam.platform.login()");
                        ctrl.doLogin();
                    }
                });
            }
            else {
                ctrl.doLogin();
            }
        });
    }

    this.checkForAuthToken = function() {
        var def = $q.defer();
        var yammerToken = localStorage.getItem("yammer_token");
        if (yammerToken && yammerToken !== "undefined"){
            def.resolve(yammerToken);
        }
        else {
            var loginName = "i:0#.f|membership|" + _spPageContextInfo.userLoginName;
            
            $pnp.sp.profiles.getUserProfilePropertyFor(loginName, "YammerOAuth").then(function (authToken){
                if (authToken){
                    profileUpdated = true;
                    //alert("Retrieved yammer token from profile");
                    localStorage.removeItem("yammer_token");
                    localStorage.setItem("yammer_token", authToken);
                }
                def.resolve(authToken);
            });
            
        }
        return def.promise;
    }

    this.setUserProfileProperty = function(yammerToken){
        var defer = $q.defer();
        SP.SOD.executeFunc('SP.js', 'SP.ClientContext', function() {
            SP.SOD.executeFunc('userprofile', 'SP.UserProfiles.PeopleManager', function() {
                //Get Current Context	
                var clientContext = SP.ClientContext.get_current();
                var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
            
                var currentUserAccountName = "i:0#.f|membership|" + _spPageContextInfo.userLoginName;
                peopleManager.setSingleValueProfileProperty(currentUserAccountName, "YammerOAuth", yammerToken);
                
                //Execute the Query.
                clientContext.executeQueryAsync(function(){
                    console.log("yammer profile field updated!");
                    profileUpdated = true;
                    defer.resolve();
                }, 
                function(sender,args){
                    //On Error
                    console.log("Error logging in to Yammer", args.get_message());
                    defer.resolve();
                });		
            });
        });
        return defer.promise;
    }

    this.doLogin = function () {
        yam.platform.login({}, function (response) { //prompt user to login and authorize your app, as necessary
            if (response.authResponse) {
                console.log("Yammer -> logged in (initial logon)");
                yam.platform.setAuthToken(response.access_token.token, function (response) {
                    if (profileUpdated){
                        localStorage.removeItem("yammer_token");
                        localStorage.setItem("yammer_token", response.access_token.token);
                    }
                    else {
                        ctrl.setUserProfileProperty(response.access_token.token).then(function(){
                            localStorage.removeItem("yammer_token");
                            localStorage.setItem("yammer_token", response.access_token.token);
                            console.log("Yammer -> setAuthToken finished (new token)");
                        });
                    }
                });
            }
        });
    }
}).component('yammerLogin', {
    controller: ctrlName
})