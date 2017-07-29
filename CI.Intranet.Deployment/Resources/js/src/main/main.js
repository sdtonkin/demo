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
require('../services/storage-service.js');
require('../services/modal-service.js');
require('../services/rss-feed-service.js');
require('../services/tool-bar-service.js');

// System Components
require('../components/common.js');
require('../components/modal.js');

// Components
require('../components/my-rss-feeds.js');
require('../components/my-tool-bar.js');
require('../components/my-bookmarks.js');

