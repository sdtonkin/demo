(function () {
    var baseUrl = '/_catalogs/masterpage/Compassion/js/lib/',
        angular = 'angular.min.js',
        angularMap = 'angular.min.js.map',
        imageAddr = 'https://compassion.sharepoint.com/sites/stage/_catalogs/masterpage/Compassion/images/flag.png',
        defaultStyleSheet = '/sites/stage/_catalogs/masterpage/Compassion/css/main.min.css';
    lowStyleSheet = '/sites/stage/_catalogs/masterpage/Compassion/css/low.min.css';
    downloadSize = 190497; //bytes;
    console.log(typeof angular == 'undefined');

    InitiateSpeedDetection();

    if (typeof angular == 'undefined') {
        document.write('<script type="text/javascript" src="' + baseUrl + angular + '" />');
    }
    /*
    if (window.addEventListener) {
        window.addEventListener('load', InitiateSpeedDetection, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', InitiateSpeedDetection);
    }
    */

    function ShowProgressMessage(msg) {
        if (console) {
            if (typeof msg == "string") {
                console.log(msg);
            } else {
                for (var i = 0; i < msg.length; i++) {
                    console.log(msg[i]);
                }
            }
        }

        var oProgress = document.getElementById("progress");
        if (oProgress) {
            var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
            oProgress.innerHTML = actualHTML;
        }
    }
    function addStyleSheet(src) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.type = 'text/css';
        link.href = src;
        document.head.appendChild(link);
    }

    function InitiateSpeedDetection() {
        ShowProgressMessage("Loading the image, please wait...");
        var count = 0;
        window.setTimeout(
            function () {
                MeasureConnectionSpeed();
            }, 1);

    };

    function MeasureConnectionSpeed() {
        var startTime, endTime;
        var download = new Image();

        for (el of document.querySelectorAll("img[src]")) {
            console.log(el);
        }


        download.onload = function () {
            endTime = (new Date()).getTime();
            showResults();
        }

        download.onerror = function (err, msg) {
            ShowProgressMessage("Invalid image, or error downloading");
        }

        startTime = (new Date()).getTime();
        var cacheBuster = "?nnn=" + startTime;
        download.src = imageAddr + cacheBuster;

        window.setTimeout(
            function () {
                if (endTime == null) {
                    window.lowBandwidth = true;
                } else {
                    window.lowBandwidth = false;
                }
            }, 2000);

        function showResults() {
            var duration = (endTime - startTime) / 1000;
            var bitsLoaded = downloadSize * 8;
            var speedBps = (bitsLoaded / duration).toFixed(2);
            var speedKbps = (speedBps / 1024).toFixed(2);
            var speedMbps = (speedKbps / 1024).toFixed(2);
            ShowProgressMessage([
                "Your connection speed is:",
                "Duration: " + duration,
                speedBps + " bps",
                speedKbps + " kbps",
                speedMbps + " Mbps"
            ]);
        }
    }
})();