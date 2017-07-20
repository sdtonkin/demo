var app = angular.module('compassionIntranet', []).config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain. **.
        'https://api.rss2json.com/**'
    ]);
});

require("../main/config.js");

// Services
require('../services/rss-feed-service.js');

// Components
require('../components/my-rss-feeds.js');

