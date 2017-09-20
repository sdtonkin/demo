'use strict';
var myApp = angular.module('compassionIntranet'),
    controllerName = 'uiHelper',
    firstNameId = 'ci-user-first-name',
    greetingId = 'ci-greeting';

myApp.controller(controllerName, ['$scope', 'storage', 'COM_CONFIG', function ($scope, storage, COM_CONFIG) {
    var userDisplayName = _spPageContextInfo.userDisplayName,
    userId = _spPageContextInfo.userId;
    var userFirstName = getFirstName(userDisplayName);
    var userLastName = getLastName(userDisplayName);
    var toolBarStatusCacheKey = 'toolbarStatus';
    //Setup Responsive Variables
    var isMobile = "",
    isTablet = "",
    isDesktop = "";

    var ctrl = this;
    

    $scope.init = function () {
        ctrl.isToolbarOpen = (storage.get(toolBarStatusCacheKey) == null ? false : storage.get(toolBarStatusCacheKey));
        addFirstNameToWelcomeMessage(userFirstName);
        $(window).resize(processWindowSize);
        processWindowSize();
        if (window.lowBandwidth) {
            $('body').addClass('low-bandwidth');
        }
        
        // session storage
        $pnp.storage.session.deleteExpired();

        // local storage
        $pnp.storage.local.deleteExpired();
    };
    ctrl.setToolbarStatus = setToolbarStatus;
    function setToolbarStatus() {
        var isOpen = !ctrl.isToolbarOpen;
        if (isOpen) {
            storage.set(toolBarStatusCacheKey, isOpen);
        } else {
            storage.set(toolBarStatusCacheKey, isOpen);
        }
        ctrl.isToolbarOpen = isOpen;
    }
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

            // $leftContent = $('.main-left-content');
            // $rightBack = $('.container-fluid .back-image');
            // $leftBackInitial = $leftContent.height();

            //$('.container-fluid .back-image').css('height', $('.main-left-content').height() + 40);
            
        }, 2000);
    }
    function addFirstNameToWelcomeMessage(firstName) {
        $('#' + firstNameId).text(firstName);
        $('#' + greetingId).text(getGreeting());
    }
    function getFirstName(fullName) {
        var names = fullName.split(' ');
        if (names.length > 0)
            return names[0];
        else
            return '';
    }
    function getGreeting() {
        var currentHour = new Date().getHours();
        console.log(currentHour);
        switch(true) {
            case (currentHour >= 0 && currentHour < 12):
                return "Good Morning";
                break;
            case (currentHour >= 12 && currentHour < 17):
                return "Good Afternoon";
                break;
            case (currentHour >= 17 && currentHour <= 24):
                return "Good Evening";
                break;
        }

    }
    function getLastName(fullName) {
        var names = fullName.split(' ');
        if (names.length > 1)
            return names[1];
        else
            return '';
    }
}]);