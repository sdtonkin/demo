/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

"use strict";

(function () {
    angular
      .module('compassionIntranet')
      .service('graphService', ['$http', '$q', 'COM_CONFIG', 'common', function ($http, $q, COM_CONFIG, common) {
          var ctrl = this;
          var clientApplication;
          var myDocuments = 'https://graph.microsoft.com/v1.0/me/drive/recent',
              myPeople = 'https://graph.microsoft.com/beta/me/people',
              users = 'https://graph.microsoft.com/v1.0/users/',              
              userPic = '/photo/$value',
              me = 'https://graph.microsoft.com/v1.0/me';
          // Initialize the auth request
          clientApplication = createApplication(COM_CONFIG.msGraph.appId);
          clientApplication.redirectUri = COM_CONFIG.msGraph.redirectUri;
          
          ctrl.isAuthenticated = isAuthenticated;
          ctrl.getMyPeople = function () {
              try {
                  var defer = $q.defer();
                  if (!ctrl.isAuthenticated()) {
                      login();
                  }

                  var bearer = 'Bearer ' + localStorage.token;
                  var request = {
                      method: 'GET',
                      url: myPeople,
                      headers: {
                          'Access-Control-Allow-Origin': true,
                          'Access-Control-Allow-Credentials': true,
                          'Authorization': bearer
                      }
                  };
                  $http(request)
                  .then(function (data) {
                      var ppl = data.data.value;
                      var response = [];
                      var promises = [];

                      for (var i = 0; i < ppl.length; i++) {
                          var person = ppl[i];
                          var p = {
                              displayName: person.displayName,
                              group: person.department,
                              title: person.title,
                              location: person.officeLocation,
                              phone: (person.phones.length > 0 ? person.phones[0].number : ''),
                              userPrincipalName: person.userPrincipalName,
                              picUrl: "/_layouts/15/userphoto.aspx?size=S&accountname=" + person.userPrincipalName,
                              logo: COM_CONFIG.rootWeb + '/_catalogs/masterpage/Compassion/images/shape.png'
                          };
                          response.push(p);
                      }
                      defer.resolve(response);
                  })
                  .catch(function (data) {
                      if (COM_CONFIG.isProduction) {
                          defer.reject(data);
                      }
                      else {
                          var p = getMockData();
                          defer.resolve(p);
                      }
                  });
                  return defer.promise;
            }
            catch(err) {
                console.log(err);
            }
          };
          ctrl.searchMyUsers = function (queryText) {
              var defer = $q.defer();
              if (!ctrl.isAuthenticated()) {
                  login();
              }
              
              var bearer = 'Bearer ' + localStorage.token;
              var request = {
                  method: 'GET',
                  url: myPeople + '?$search=' + queryText,
                  headers: {
                      'Access-Control-Allow-Origin': true,
                      'Access-Control-Allow-Credentials': true,
                      'Authorization': bearer
                  }
              };
              $http(request)
              .then(function (data) {
                  var ppl = data.data.value;
                  var response = [];
                  var promises = [];

                  for (var i = 0; i < ppl.length; i++) {
                      var person = ppl[i];
                      var p = {
                          displayName: person.displayName,
                          group: person.department,
                          title: person.title,
                          location: person.officeLocation,
                          phone: (person.phones.length > 0 ? person.phones[0].number : ''),
                          userPrincipalName: person.userPrincipalName,
                          picUrl: '/_layouts/15/userphoto.aspx?size=S&accountname=' + person.userPrincipalName,
                          logo: COM_CONFIG.rootWeb + '/_catalogs/masterpage/Compassion/images/shape.png'
                      };
                      response.push(p);
                  }
                  defer.resolve(response);
              })
              .catch(function (data) {
                  defer.reject(data);
                  if (!COM_CONFIG.isProduction) { console.log('search my users', JSON.stringify(data)); }
              });
              return defer.promise;
          };
          function createApplication(applicationConfig) {
              var clientApplication = new Msal.UserAgentApplication(applicationConfig, null, function (errorDesc, token, error, tokenType) {
                  // Called after loginRedirect or acquireTokenPopup
              });
              return clientApplication;
          }
          function isAuthenticated() {
              return (clientApplication.getAllUsers().length !== 0)
          }          
          function login() {
              return;
              clientApplication.loginPopup(COM_CONFIG.msGraph.graphScopes).then(function (idToken) {
                  localStorage.user = JSON.stringify(clientApplication.getUser());
                  clientApplication.acquireTokenSilent(COM_CONFIG.msGraph.graphScopes).then(function (accessToken) {
                      localStorage.token = accessToken;
                  }, function (error) {
                      clientApplication.acquireTokenPopup(COM_CONFIG.msGraph.graphScopes).then(function (accessToken) {
                          localStorage.token = accessToken;
                      }, function (error) {
                          window.alert("Error acquiring the popup:\n" + error);
                      });
                  })
              }, function (error) {
                  window.alert("Error during login:\n" + error);
              });
              
          }
          function getToken() {
              clientApplication.acquireTokenSilent(COM_CONFIG.msGraph.graphScopes).then(function (accessToken) {
                  localStorage.token = accessToken;
                  //window.location.reload();
              }, function (error) {
                  clientApplication.acquireTokenPopup(COM_CONFIG.msGraph.graphScopes).then(function (accessToken) {
                      localStorage.token = accessToken;
                  }, function (error) {
                      window.alert("Error acquiring the popup:\n" + error);
                  });
              });
          }
          function getMockData() {
              var response = [];
              var p = {
                  displayName: 'Mock Data',
                  group: 'Mock Department',
                  title: 'Mock Director',
                  location: 'Mock Location, CO',
                  phone: '555-555-5555',
                  userPrincipalName: 'stonkin@us.ci.org',
                  picUrl: '/_layouts/15/userphoto.aspx?size=S&accountname=stonkin@us.ci.org',
                  logo: COM_CONFIG.rootWeb + '/_catalogs/masterpage/Compassion/images/shape.png'
              };

              for (var i = 0; i < 17; i++) {
                  var p1 = angular.copy(p);
                  p1.displayName = p.displayName + ' ' + i;
                  p1.userPrincipalName = p.userPrincipalName + i;
                  p1.id = common.createGuid();
                  response.push(p1);
              }
              return response;
          }
      }]);
})();

/*'use strict';
angular.module('compassionIntranet').service('graphService', ['$http', '$q', 'adalAuthenticationService', 'COM_CONFIG', 'storage', 'common', function ($http, $q, adalAuthenticationService, COM_CONFIG, storage, common) {
    var ctrl = this;
    var adalAuthContext = new AuthenticationContext(adalAuthenticationService.config);
    var myDocuments = 'https://graph.microsoft.com/v1.0/me/drive/recent',
        myPeople = 'https://graph.microsoft.com/beta/me/people',
        users = 'https://graph.microsoft.com/v1.0/users/',
        userPic = '/photo/$value';


    ctrl.getMyPeople = function () {
        var defer = $q.defer();
        if (!adalAuthenticationService.userInfo.isAuthenticated) {
            loginComponent();
        }
        var request = {
            method: 'GET',
            url: myPeople,
            header: {
                'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Credentials': true
            }
        };
        $http(request)
        .then(function (data) {
            var ppl = data.data.value;
            var response = [];
            var promises = [];

            
            for (var i = 0; i < ppl.length; i++) {
                var person = ppl[i];
                var p = {
                    displayName: person.displayName,
                    group: person.department,
                    title: person.title,
                    location: person.officeLocation,
                    phone: (person.phones.length > 0 ? person.phones[0].number : ''),
                    userPrincipalName: person.userPrincipalName
                };
                response.push(p);
                promises.push(getMyPicture(person.userPrincipalName));
            }
            $q.all(promises).then(function (response) {
                defer.resolve(response);
                console.log(response);
            }).catch(function (data) {
                defer.resolve(response);
                console.log("Couldn't get my people: " + JSON.stringify(data));
            });
        })
        .catch(function (data) {
            defer.reject(data);
            console.log(JSON.stringify(data));
        });
        return defer.promise;
    };
    ctrl.getMyDocuments = function () {

        if (!adalAuthenticationService.userInfo.isAuthenticated) {
            loginComponent();
        }
        var request = {
            method: 'GET',
            url: myDocuments,
            header: {
                'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Credentials': true
            }
        };
        $http(request)
        .then(function (data) {
            console.log(data);
            console.log("Got the data");
        })
        .catch(function (data) {
            console.log(JSON.stringify(data));
        });
    };
    function loginComponent() {
        var isCallback = adalAuthContext.isCallback(window.location.hash);
        if (isCallback && !adalAuthContext.getLoginError()) {
            adalAuthContext.handleWindowCallback();
        }
        else {
            var user = adalAuthContext.getCachedUser();
            var token = adalAuthContext.getCachedToken();
            if (!token) {
                /*
                authContext.acquireToken(adalAuthContext.config.loginResource, function (error, token) {
                    if (error || !token) {
                        console.log("ADAL error occurred: " + error);
                    }
                    console.log("got the token.. resolving tokendefer");
                    window.accessToken = token;
                    window.tokenDefer.resolve(token);
                });
                
                adalAuthContext.handleWindowCallback();
                var resource = adalAuthContext.getResourceForEndpoint('https://graph.microsoft.com/v1.0/users/me@teganwilson.onmicrosoft.com/me');
                var t = adalAuthContext.getCachedToken(resource);
                console.log(t);
            }
            if (!user) {
                //Log in user
                adalAuthContext.login();
            }
        }
    }    
    function getMyPicture(userName) {
        var defer = $q.defer();
        var request = {
            method: 'GET',
            url: users + userName + userPic,
            header: {
                'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Credentials': true
            }
        };
        $http(request)
        .then(function (data) {
            defer.resolve(data);
            console.log(data);
            console.log("Got the picture");
        })
        .catch(function (data) {
            defer.reject(data);
            console.log(JSON.stringify(data));
            console.log("Couldn't get the data");
        });
        return defer.promise;
    }
}]);
*/