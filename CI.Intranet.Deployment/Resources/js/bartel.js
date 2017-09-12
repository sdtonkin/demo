  $( function() {

    $(window).resize(processWindowSize);

  } );//doc ready

    //Setup Responsive Variables
    isMobile = "";
    isTablet = "";
    isDesktop = "";

    // $(window).resize(processWindowSize);

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

        if(width >= 991) {
          isMobile = false;
          isTablet = false;
          isDesktop = true;
        }else if(width >= 768){
          isTablet = true;
        }else {
          isMobile = true;
          isTablet = false;
          isDesktop = false;
        }
        
        //setup functions that need to be ran on resize
        rightRailHeight();
    }//processWindowSize

function initFunctions() {
    // SearchBar();
}
    //change left rail height on resize to match main content container
    function rightRailHeight(){
      setTimeout(function(){
        $rightRail = $('.main-right-rail');
        $rightRailInitial = $rightRail.height();
        //RESET HEIGHT BEFORE SETTING SO THAT CONTAINER DOESNT INCLUDE IT.

        if (isDesktop === true){
          var mainContainerHeight = $('.main-left-content').outerHeight(true);
          if($rightRailInitial < mainContainerHeight){
            $rightRail.css('height', mainContainerHeight);
          }else{
            $rightRail.css('height', $rightRailInitial);
          }
        }else{
          $rightRail.css('height', '');
          $rightRail.css('height', 'auto');
        }
      }, 2000);
    }




    
// _spBodyOnLoadFunctionNames.push("initFunctions");
// _spBodyOnLoadFunctionNames.push("processWindowSize");


initFunctions();
processWindowSize();
// megaNavDrop();
// mobileSearch();