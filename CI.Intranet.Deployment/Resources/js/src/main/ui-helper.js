'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'uiHelper',
    firstNameId = 'ci-user-first-name';

myApp.controller(controllerName, ['$scope', 'COM_CONFIG', function ($scope, COM_CONFIG) {
    var userDisplayName = _spPageContextInfo.userDisplayName,
    userId = _spPageContextInfo.userId;
    var userFirstName = getFirstName(userDisplayName);
    var userLastName = getLastName(userDisplayName);
    //Setup Responsive Variables
    var isMobile = "",
    isTablet = "",
    isDesktop = "";

    $scope.init = function () {
        addFirstNameToWelcomeMessage(userFirstName);
        $(window).resize(processWindowSize);
        processWindowSize();
    };
    //check window size and setup functions
    function processWindowSize() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE");

        if (msie > 0)  // If Internet Explorer
        {
            var width = window.innerWidth;
        }
        else  // If another browser
        {
            var width = $(window).width();
        }

        if (width >= 991) {
            isMobile = false;
            isTablet = false;
            isDesktop = true;
        } else if (width >= 768) {
            isTablet = true;
        } else {
            isMobile = true;
            isTablet = false;
            isDesktop = false;
        }

        //setup functions that need to be ran on resize
        rightRailHeight();
    }//processWindowSize
    function rightRailHeight() {
        setTimeout(function () {
            /* not sure what $rightRail is...ask Bartke
            $rightRail = $('.main-right-rail');
            $rightRailInitial = $rightRail.height();
            //RESET HEIGHT BEFORE SETTING SO THAT CONTAINER DOESNT INCLUDE IT.

            if (isDesktop === true) {
                var mainContainerHeight = $('.main-left-content').outerHeight(true);
                if ($rightRailInitial < mainContainerHeight) {
                    $rightRail.css('height', mainContainerHeight);
                } else {
                    $rightRail.css('height', $rightRailInitial);
                }
            } else {
                $rightRail.css('height', '');
                $rightRail.css('height', 'auto');
            }
            */
        }, 2000);
    }
    function addFirstNameToWelcomeMessage(firstName) {
        $('#' + firstNameId).text(firstName);
    }
    function getFirstName(fullName) {
        var names = fullName.split(' ');
        if (names.length > 0)
            return names[0];
        else
            return '';
    }
    function getLastName(fullName) {
        var names = fullName.split(' ');
        if (names.length > 1)
            return names[1];
        else
            return '';
    }
}]);